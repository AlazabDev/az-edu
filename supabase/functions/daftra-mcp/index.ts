/**
 * Alazab Daftra MCP — Supabase Edge Function
 * Entry point only. Preserves every existing module on disk.
 * Requires existing: catalog.json, types.ts, modules/registry.ts.
 * Registry resolves all 301 catalog operations through the 70 generated modules.
 * Legacy modules are preserved and are NOT overwritten or implicitly substituted.
 */
import catalog from "./catalog.json" with { type: "json" };
import type { Dict, Operation, ToolResult } from "./types.ts";
import { isObject, toolResult } from "./types.ts";
import { executeRegistered, validateRegistry } from "./modules/registry.ts";

const OPERATIONS = catalog as Operation[];
const COVERAGE = validateRegistry(OPERATIONS);
const BY_ID = new Map<string, Operation>();
for (const op of OPERATIONS) {
  if (BY_ID.has(op.id)) throw new Error(`Duplicate operation ID: ${op.id}`);
  BY_ID.set(op.id, op);
}
// Backward-compatible IDs used by the original Supabase MCP.
for (const op of OPERATIONS) {
  if (op.id.endsWith("_format")) {
    const alias = op.id.slice(0, -"_format".length);
    if (!BY_ID.has(alias)) BY_ID.set(alias, op);
  }
}

const HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info, x-mcp-key, mcp-session-id, mcp-protocol-version",
  "Access-Control-Expose-Headers": "mcp-session-id, mcp-protocol-version",
  "Cache-Control": "no-store",
};
const JSON_HEADERS = { ...HEADERS, "Content-Type": "application/json; charset=utf-8" };
const response = (value: unknown, status = 200) =>
  new Response(JSON.stringify(value), { status, headers: JSON_HEADERS });
const rpcError = (id: unknown, code: number, message: string) =>
  ({ jsonrpc: "2.0", id, error: { code, message } });
const rpcResult = (id: unknown, result: unknown) => ({ jsonrpc: "2.0", id, result });

const TOOLS = [
  {
    name: "daftra_list_categories",
    description: "List Daftra API categories with operation counts.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "daftra_search_operations",
    description: "Search the Daftra API catalog by words, category and HTTP method.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string" }, category: { type: "string" },
        method: { type: "string", enum: ["GET", "POST", "PUT", "PATCH", "DELETE"] },
        limit: { type: "integer", minimum: 1, maximum: 100, default: 30 },
      },
    },
  },
  {
    name: "daftra_describe_operation",
    description: "Get the exact path, parameters and request-body schema for an operation.",
    inputSchema: {
      type: "object", properties: { operation_id: { type: "string" } },
      required: ["operation_id"], additionalProperties: false,
    },
  },
  {
    name: "daftra_call",
    description: "Execute a Daftra operation by ID. Non-GET and state-changing GET calls may modify data.",
    inputSchema: {
      type: "object",
      properties: {
        operation_id: { type: "string" },
        path_params: { type: "object", additionalProperties: true },
        query: { type: "object", additionalProperties: true },
        body: { type: "object", additionalProperties: true },
      },
      required: ["operation_id"],
    },
  },
] as const;

async function invokeTool(name: string, args: Dict): Promise<ToolResult> {
  if (name === "daftra_list_categories") {
    const counts: Record<string, number> = {};
    for (const op of OPERATIONS) counts[op.t] = (counts[op.t] ?? 0) + 1;
    return toolResult(counts);
  }
  if (name === "daftra_search_operations") {
    const words = typeof args.query === "string" ? args.query.toLowerCase().trim().split(/\s+/).filter(Boolean) : [];
    const limitRaw = Number(args.limit ?? 30);
    const limit = Number.isFinite(limitRaw) ? Math.max(1, Math.min(100, Math.trunc(limitRaw))) : 30;
    const results = OPERATIONS.filter((op) =>
      (!args.category || op.t.toLowerCase() === String(args.category).toLowerCase()) &&
      (!args.method || op.m === args.method) &&
      words.every((word) => `${op.id} ${op.p} ${op.s} ${op.t}`.toLowerCase().includes(word))
    ).slice(0, limit).map((op) => ({
      id: op.id, method: op.m, path: op.p, summary: op.s, category: op.t,
    }));
    return toolResult(results);
  }
  if (name === "daftra_describe_operation") {
    if (typeof args.operation_id !== "string" || !args.operation_id)
      return toolResult("operation_id must be a nonempty string", true);
    const op = BY_ID.get(args.operation_id);
    return op ? toolResult(op) : toolResult("Unknown operation_id", true);
  }
  if (name === "daftra_call") {
    if (typeof args.operation_id !== "string" || !args.operation_id)
      return toolResult("operation_id must be a nonempty string", true);
    const op = BY_ID.get(args.operation_id);
    if (!op) return toolResult("Unknown operation_id", true);
    try {
      return await executeRegistered(op, args);
    } catch (error) {
      return toolResult({ error: error instanceof Error ? error.message : String(error) }, true);
    }
  }
  return toolResult(`Unknown tool: ${name}`, true);
}

async function handle(message: unknown): Promise<unknown | null> {
  if (!isObject(message) || message.jsonrpc !== "2.0" || typeof message.method !== "string")
    return rpcError(isObject(message) && message.id !== undefined ? message.id : null, -32600, "Invalid Request");
  // MCP notifications have no id; do not reply to them.
  if (message.id === undefined) return null;
  const id = message.id;
  if (!(typeof id === "string" || typeof id === "number" || id === null))
    return rpcError(null, -32600, "Invalid Request ID");
  switch (message.method) {
    case "initialize": {
      const requested = isObject(message.params) ? message.params.protocolVersion : undefined;
      const supported = ["2025-03-26", "2024-11-05"];
      const version = typeof requested === "string" && supported.includes(requested) ? requested : "2025-03-26";
      return rpcResult(id, {
        protocolVersion: version,
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: "daftra-mcp", version: "3.1.0" },
      });
    }
    case "ping": return rpcResult(id, {});
    case "tools/list": return rpcResult(id, { tools: TOOLS });
    case "tools/call": {
      if (!isObject(message.params) || typeof message.params.name !== "string")
        return rpcError(id, -32602, "Expected params.name");
      if (message.params.arguments !== undefined && !isObject(message.params.arguments))
        return rpcError(id, -32602, "Expected params.arguments to be an object");
      const name = message.params.name;
      if (!TOOLS.some((tool) => tool.name === name))
        return rpcError(id, -32602, `Unknown tool: ${name}`);
      return rpcResult(id, await invokeTool(name, isObject(message.params.arguments) ? message.params.arguments : {}));
    }
    default: return rpcError(id, -32601, `Method not found: ${message.method}`);
  }
}

Deno.serve(async (request: Request): Promise<Response> => {
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: HEADERS });
  const expected = Deno.env.get("MCP_ACCESS_KEY");
  const headerKey = request.headers.get("x-mcp-key");
  const bearer = request.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!expected || (headerKey !== expected && bearer !== expected))
    return response({ error: "Unauthorized" }, 401);

  if (request.method === "GET") {
    return response({
      name: "daftra-mcp", version: "3.1.0", operations: OPERATIONS.length,
      registeredModules: COVERAGE.modules, registeredOperations: COVERAGE.operations,
      tools: TOOLS.map((tool) => tool.name),
    });
  }
  if (request.method !== "POST") return response({ error: "Method Not Allowed" }, 405);

  let payload: unknown;
  try { payload = await request.json(); }
  catch { return response(rpcError(null, -32700, "Parse error"), 400); }

  try {
    if (Array.isArray(payload) && payload.length === 0)
      return response(rpcError(null, -32600, "Empty batch"), 400);
    const output = Array.isArray(payload)
      ? (await Promise.all(payload.map(handle))).filter((item) => item !== null)
      : await handle(payload);
    if (output === null || (Array.isArray(output) && output.length === 0))
      return new Response(null, { status: 202, headers: HEADERS });
    return response(output);
  } catch (error) {
    console.error("MCP handler failure:", error instanceof Error ? error.message : String(error));
    return response(rpcError(null, -32603, "Internal error"), 500);
  }
});

// MCP server (Streamable HTTP, JSON responses) exposing Daftra accounting API operations.
import catalog from "./catalog.json" with { type: "json" };

type Op = { id: string; m: string; p: string; s: string; t: string; params: { n: string; in: string; r: boolean; d: string }[]; body: unknown };
const OPS = catalog as Op[];
const BY_ID = new Map(OPS.map((o) => [o.id, o]));

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-mcp-key, mcp-session-id, mcp-protocol-version",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

const TOOLS = [
  {
    name: "daftra_list_categories",
    description: "List Daftra API categories (tags) with the number of operations in each.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "daftra_search_operations",
    description: "Search the 300+ Daftra API operations (invoices, clients, products, journals, purchases, stock, etc.) by keyword and/or category. Returns operation ids to use with daftra_describe_operation and daftra_call.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Keyword(s), e.g. 'invoice payment', 'client', 'journal'" },
        category: { type: "string" },
        method: { type: "string", enum: ["GET", "POST", "PUT", "DELETE", "PATCH"] },
        limit: { type: "number", default: 30 },
      },
    },
  },
  {
    name: "daftra_describe_operation",
    description: "Get full details of a Daftra operation: path, parameters and request body shape.",
    inputSchema: { type: "object", properties: { operation_id: { type: "string" } }, required: ["operation_id"] },
  },
  {
    name: "daftra_call",
    description: "Execute a Daftra API operation by id. Provide path params (e.g. {id: 5}), query params (e.g. {page:1, limit:20}) and JSON body for POST/PUT.",
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
];

const text = (v: unknown, isError = false) => ({
  content: [{ type: "text", text: typeof v === "string" ? v : JSON.stringify(v, null, 2) }],
  isError,
});

async function callDaftra(op: Op, pathParams: Record<string, unknown> = {}, query: Record<string, unknown> = {}, body?: unknown) {
  const sub = Deno.env.get("DAFTRA_SUBDOMAIN");
  const key = Deno.env.get("DAFTRA_API_KEY");
  if (!sub || !key) return text("Daftra is not configured: DAFTRA_SUBDOMAIN / DAFTRA_API_KEY secrets are missing.", true);
  let path = op.p.replace("{format}", ".json");
  for (const m of path.matchAll(/\{([^}]+)\}/g)) {
    const v = pathParams[m[1]] ?? pathParams[m[1].toLowerCase()];
    if (v === undefined) return text(`Missing path parameter: ${m[1]}`, true);
    path = path.replace(m[0], encodeURIComponent(String(v)));
  }
  const host = sub.includes(".") ? sub : `${sub}.daftra.com`;
  const url = new URL(`https://${host.replace(/^https?:\/\//, "")}/api2${path}`);
  for (const [k, v] of Object.entries(query)) if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
  const res = await fetch(url, {
    method: op.m,
    headers: { APIKEY: key, Authorization: `Bearer ${key}`, Accept: "application/json", "Content-Type": "application/json" },
    body: body && op.m !== "GET" && op.m !== "DELETE" ? JSON.stringify(body) : undefined,
  });
  const raw = await res.text();
  let data: unknown = raw;
  try { data = JSON.parse(raw); } catch { /* keep text */ }
  const out = JSON.stringify({ status: res.status, data }, null, 2);
  return text(out.length > 60000 ? out.slice(0, 60000) + "\n...[truncated, use page/limit]" : out, !res.ok);
}

async function runTool(name: string, a: any) {
  switch (name) {
    case "daftra_list_categories": {
      const c: Record<string, number> = {};
      for (const o of OPS) c[o.t || "other"] = (c[o.t || "other"] || 0) + 1;
      return text(c);
    }
    case "daftra_search_operations": {
      const words = String(a?.query || "").toLowerCase().split(/\s+/).filter(Boolean);
      const res = OPS.filter((o) => {
        if (a?.category && o.t.toLowerCase() !== String(a.category).toLowerCase()) return false;
        if (a?.method && o.m !== a.method) return false;
        const hay = `${o.id} ${o.p} ${o.s} ${o.t}`.toLowerCase();
        return words.every((w) => hay.includes(w));
      }).slice(0, Number(a?.limit) || 30).map((o) => ({ id: o.id, method: o.m, path: o.p, summary: o.s, category: o.t }));
      return text(res.length ? res : "No operations found.");
    }
    case "daftra_describe_operation": {
      const op = BY_ID.get(a?.operation_id);
      return op ? text(op) : text("Unknown operation_id. Use daftra_search_operations.", true);
    }
    case "daftra_call": {
      const op = BY_ID.get(a?.operation_id);
      if (!op) return text("Unknown operation_id. Use daftra_search_operations.", true);
      return await callDaftra(op, a.path_params, a.query, a.body);
    }
  }
  return text(`Unknown tool ${name}`, true);
}

async function handle(msg: any) {
  const { id, method, params } = msg;
  if (id === undefined) return null; // notification
  const ok = (result: unknown) => ({ jsonrpc: "2.0", id, result });
  switch (method) {
    case "initialize":
      return ok({
        protocolVersion: params?.protocolVersion || "2025-03-26",
        capabilities: { tools: {} },
        serverInfo: { name: "daftra-mcp", version: "1.0.0" },
      });
    case "ping": return ok({});
    case "tools/list": return ok({ tools: TOOLS });
    case "tools/call":
      try { return ok(await runTool(params?.name, params?.arguments || {})); }
      catch (e) { return ok(text(`Error: ${(e as Error).message}`, true)); }
    default:
      return { jsonrpc: "2.0", id, error: { code: -32601, message: `Method not found: ${method}` } };
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  const access = Deno.env.get("MCP_ACCESS_KEY");
  const url = new URL(req.url);
  const given = req.headers.get("x-mcp-key") || url.searchParams.get("key") ||
    req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!access || given !== access) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...cors, "Content-Type": "application/json" } });
  }
  if (req.method === "GET") {
    return new Response(JSON.stringify({ name: "daftra-mcp", operations: OPS.length }), { headers: { ...cors, "Content-Type": "application/json" } });
  }
  let body: any;
  try { body = await req.json(); } catch {
    return new Response(JSON.stringify({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } }), { status: 400, headers: { ...cors, "Content-Type": "application/json" } });
  }
  const results = Array.isArray(body) ? (await Promise.all(body.map(handle))).filter(Boolean) : await handle(body);
  if (!results || (Array.isArray(results) && !results.length)) return new Response(null, { status: 202, headers: cors });
  return new Response(JSON.stringify(results), { headers: { ...cors, "Content-Type": "application/json" } });
});

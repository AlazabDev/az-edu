// modules/catalog-runner.ts
// يوفر مرونة للوصول لأي عملية تخصصية من الـ 301 عملية المتاحة في كتالوج دفترة
import { callDaftraApi } from "../daftra-client.ts";
import { McpTool } from "../types.ts";

export const catalogRunnerTools: McpTool[] = [
  {
    name: "daftra_execute_raw_operation",
    description: "استدعاء أي مسار أو عملية تخصصية من الـ 301 عملية في دفترة مباشرة عبر المسار ونوع الطلب.",
    inputSchema: {
      type: "object",
      properties: {
        method: { type: "string", description: "نوع الطلب: GET, POST, PUT, DELETE" },
        endpoint: { type: "string", description: "مسار العملية (مثال: leaves, work_shifts, assets)" },
        params: { type: "object", description: "معاملات الـ Query String" },
        body: { type: "object", description: "جسم الطلب في حال POST أو PUT" },
        confirm: { type: "boolean", description: "مطلوب true لعمليات POST و PUT و DELETE" }
      },
      required: ["method", "endpoint"]
    },
    handler: async (args) => {
      const method = (args.method || "GET").toUpperCase();
      if (method !== "GET" && !args.confirm) {
        throw new Error(`عمليات ${method} تتطلب تمرير confirm=true صراحة لمنع التعديل غير المقصود.`);
      }
      return await callDaftraApi(
        method as any,
        args.endpoint.endsWith(".json") ? args.endpoint : `${args.endpoint}.json`,
        args.body,
        args.params
      );
    }
  }
];

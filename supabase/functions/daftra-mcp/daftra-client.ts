// daftra-client.ts
// التعامل مع استدعاءات Daftra API ومعالجة المصادقة والـ Subdomain

export interface DaftraConfig {
  subdomain: string;
  apiKey: string;
  readOnlyDefault?: boolean;
}

export function getDaftraConfig(): DaftraConfig {
  const subdomain = Deno.env.get("DAFTRA_SUBDOMAIN") || "";
  const apiKey = Deno.env.get("DAFTRA_API_KEY") || "";
  const readOnlyDefault = (Deno.env.get("DAFTRA_READONLY") ?? "true") === "true";

  if (!subdomain || !apiKey) {
    throw new Error("Missing DAFTRA_SUBDOMAIN or DAFTRA_API_KEY environment variables.");
  }

  return { subdomain, apiKey, readOnlyDefault };
}

export async function callDaftraApi(
  method: "GET" | "POST" | "PUT" | "DELETE",
  endpoint: string,
  data?: Record<string, unknown>,
  queryParams?: Record<string, string | number>
) {
  const { subdomain, apiKey } = getDaftraConfig();

  // إعداد المسار والرابط الأساسي
  const cleanSubdomain = subdomain.replace(/\.daftra\.com$/, "").replace(/^https?:\/\//, "");
  const baseUrl = `https://${cleanSubdomain}.daftra.com/v2/api/entity`;

  let url = `${baseUrl}/${endpoint.replace(/^\//, "")}`;

  if (queryParams && Object.keys(queryParams).length > 0) {
    const searchParams = new URLSearchParams();
    for (const [k, v] of Object.entries(queryParams)) {
      if (v !== undefined && v !== null) {
        searchParams.append(k, String(v));
      }
    }
    url += `?${searchParams.toString()}`;
  }

  const headers: Record<string, string> = {
    "APIKEY": apiKey,
    "Accept": "application/json",
    "Content-Type": "application/json",
  };

  const options: RequestInit = {
    method,
    headers,
  };

  if (data && (method === "POST" || method === "PUT")) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);
  const responseData = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      `Daftra API Error (${response.status}): ${
        responseData?.message || JSON.stringify(responseData) || response.statusText
      }`
    );
  }

  return responseData;
}

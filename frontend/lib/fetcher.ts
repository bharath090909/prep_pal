// lib/fetcher.ts
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface FetcherOptions<TBody> {
  method?: HttpMethod;
  body?: TBody;
  headers?: HeadersInit;
}

export async function smartFetch<TResponse, TBody = any>(
  url: string,
  { method = "GET", body, headers }: FetcherOptions<TBody> = {}
): Promise<TResponse> {
  const res = await fetch(url, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    (errorData as any).status = res.status;
    throw errorData;
  }

  const response = await res.json();
  // response.status = res.status;

  return response;
}

import type { Env } from "../archivistTypes";

interface SearchRequest {
  entityType?: string;
  tag?: string;
  q?: string;
  limit?: number;
}

export async function handleEntitySearch(request: Request, env: Env): Promise<Response> {
  let payload: SearchRequest;
  try {
    payload = await request.json<SearchRequest>();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  }

  const limit = payload.limit && payload.limit > 0 && payload.limit <= 100 ? payload.limit : 20;
  const prefix = payload.entityType ? `canon:${payload.entityType}:` : "canon:";

  const listResult = await env.ARCHIVIST_KV.list({ prefix, limit: 1000 });
  const results: any[] = [];

  for (const keyInfo of listResult.keys) {
    if (results.length >= limit) break;
    const json = await env.ARCHIVIST_KV.get(keyInfo.name);
    if (!json) continue;

    const entity = JSON.parse(json);

    if (payload.tag && (!entity.tags || !entity.tags.includes(payload.tag))) {
      continue;
    }

    if (payload.q) {
      const haystack = `${entity.name} ${entity.summary} ${entity.body}`.toLowerCase();
      if (!haystack.includes(payload.q.toLowerCase())) {
        continue;
      }
    }

    results.push(entity);
  }

  return new Response(
    JSON.stringify({ results, count: results.length }),
    { headers: { "Content-Type": "application/json" } }
  );
}

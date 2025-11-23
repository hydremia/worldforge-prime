import type { Env } from "../archivistTypes";
import { makeCanonKey } from "../archivistRegistry";

export async function handleEntityGet(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const entityType = url.searchParams.get("type");

  if (!id || !entityType) {
    return new Response(
      JSON.stringify({ error: "Missing query params 'id' and 'type'" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const key = makeCanonKey(entityType as any, id);
  const json = await env.ARCHIVIST_KV.get(key);

  if (!json) {
    return new Response(
      JSON.stringify({ error: "Not found" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(json, { headers: { "Content-Type": "application/json" } });
}

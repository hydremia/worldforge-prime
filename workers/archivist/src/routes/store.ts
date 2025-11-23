import type { Env, CanonEntity } from "../archivistTypes";
import { putCanonEntity } from "../archivistRegistry";

async function isAuthorized(request: Request, env: Env): Promise<boolean> {
  const header = request.headers.get("Authorization") || "";
  const token = header.replace(/^Bearer\s+/i, "").trim();
  return token !== "" && token === env.ARCHIVIST_TOKEN;
}

export async function handleStore(request: Request, env: Env): Promise<Response> {
  if (!(await isAuthorized(request, env))) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  let entity: CanonEntity;
  try {
    entity = await request.json<CanonEntity>();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  }

  if (!entity.id || !entity.entityType) {
    return new Response(JSON.stringify({ error: "Missing id or entityType" }), {
      status: 400,
    });
  }

  const key = await putCanonEntity(env, entity);

  return new Response(
    JSON.stringify({ ok: true, key }),
    { headers: { "Content-Type": "application/json" } }
  );
}

import type { Env, ResolveRequest, ConflictRecord } from "../archivistTypes";
import { makeConflictKey, putCanonEntity } from "../archivistRegistry";

async function isAuthorized(request: Request, env: Env): Promise<boolean> {
  const header = request.headers.get("Authorization") || "";
  const token = header.replace(/^Bearer\s+/i, "").trim();
  return token !== "" && token === env.ARCHIVIST_TOKEN;
}

export async function handleResolve(request: Request, env: Env): Promise<Response> {
  if (!(await isAuthorized(request, env))) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  let payload: ResolveRequest;
  try {
    payload = await request.json<ResolveRequest>();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  }

  if (!payload.conflictId) {
    return new Response(JSON.stringify({ error: "Missing conflictId" }), { status: 400 });
  }

  const key = makeConflictKey(payload.conflictId);
  const conflictJson = await env.ARCHIVIST_KV.get(key);
  if (!conflictJson) {
    return new Response(JSON.stringify({ error: "Conflict not found" }), { status: 404 });
  }

  const conflict = JSON.parse(conflictJson) as ConflictRecord;

  let chosen = conflict.existing;
  if (payload.chosenVersion === "incoming") {
    chosen = conflict.incoming;
  } else if (payload.chosenVersion === "merged" && payload.mergedEntity) {
    chosen = payload.mergedEntity;
  }

  // Store chosen entity as canonical
  const canonKey = await putCanonEntity(env, chosen);

  conflict.status = "resolved";
  conflict.updatedAt = new Date().toISOString();
  if (payload.resolutionNote) conflict.resolutionNote = payload.resolutionNote;

  await env.ARCHIVIST_KV.put(key, JSON.stringify(conflict));

  return new Response(
    JSON.stringify({
      ok: true,
      conflictId: payload.conflictId,
      canonKey,
      chosenVersion: payload.chosenVersion,
    }),
    { headers: { "Content-Type": "application/json" } }
  );
}

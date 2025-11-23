import type { Env, ReviewRequest } from "../archivistTypes";
import { detectConflict } from "../archivistEngine";

async function isAuthorized(request: Request, env: Env): Promise<boolean> {
  const header = request.headers.get("Authorization") || "";
  const token = header.replace(/^Bearer\s+/i, "").trim();
  return token !== "" && token === env.ARCHIVIST_TOKEN;
}

export async function handleReview(request: Request, env: Env): Promise<Response> {
  if (!(await isAuthorized(request, env))) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  let payload: ReviewRequest;
  try {
    payload = await request.json<ReviewRequest>();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  }

  if (!payload.entity || !payload.entity.id || !payload.entity.entityType) {
    return new Response(JSON.stringify({ error: "Missing entity or id/entityType" }), {
      status: 400,
    });
  }

  const result = await detectConflict(env, payload);

  return new Response(
    JSON.stringify({
      status: result.status,
      conflictId: result.conflictRecord?.conflictId ?? null,
      conflictFields: result.conflictRecord?.conflictFields ?? [],
      entityId: payload.entity.id,
    }),
    { headers: { "Content-Type": "application/json" } }
  );
}

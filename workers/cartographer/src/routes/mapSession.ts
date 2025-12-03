import type { Env } from "../index";

/**
 * /cartographer/map/session/* routes
 *
 * HTTP layer:
 *  - /cartographer/map/session/start        (POST)
 *  - /cartographer/map/session/{id}         (GET)
 *  - /cartographer/map/session/{id}/features (POST)
 *  - /cartographer/map/session/{id}/answers  (POST)
 *  - /cartographer/map/session/{id}/proposal (GET)
 */

export async function handleMapSession(
  request: Request,
  env: Env,
  _ctx: ExecutionContext
): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method.toUpperCase();

  // POST /cartographer/map/session/start
  if (method === "POST" && path === "/cartographer/map/session/start") {
    return startSession(request, env);
  }

  // Everything else: /cartographer/map/session/{sessionId}/...
  const segments = path.split("/").filter(Boolean);
  // [ "cartographer", "map", "session", "{sessionId}", ...maybe more ]
  if (segments.length >= 4) {
    const sessionId = segments[3];
    const suffix = segments.slice(4).join("/"); // "", "features", "answers", "proposal", etc.

    if (!sessionId) {
      return jsonError("Missing sessionId in path", 400);
    }

    switch (suffix) {
      case "":
        // GET /cartographer/map/session/{sessionId}
        if (method === "GET") {
          return forwardToSessionDO(request, env, sessionId, "/session");
        }
        break;

      case "features":
        // POST /cartographer/map/session/{sessionId}/features
        if (method === "POST") {
          return forwardToSessionDO(request, env, sessionId, "/session/features");
        }
        break;

      case "answers":
        // POST /cartographer/map/session/{sessionId}/answers
        if (method === "POST") {
          return forwardToSessionDO(request, env, sessionId, "/session/answers");
        }
        break;

      case "proposal":
        // GET /cartographer/map/session/{sessionId}/proposal
        if (method === "GET") {
          return forwardToSessionDO(request, env, sessionId, "/session/proposal");
        }
        break;
    }
  }

  return jsonError("Map session route not implemented", 404);
}

async function startSession(request: Request, env: Env): Promise<Response> {
  const body = await request.json().catch(() => ({}));

  const worldId = String(body.worldId ?? "");
  const mapName = String(body.mapName ?? "");
  const sourceType = String(body.sourceType ?? "");
  const description = body.description ? String(body.description) : undefined;

  if (!worldId || !mapName || !sourceType) {
    return jsonError("worldId, mapName, and sourceType are required", 400);
  }

  // Use a deterministic name so we can always re-derive the DO id.
  const logicalName = `${worldId}:${mapName}:${Date.now()}:${crypto.randomUUID()}`;
  const id = env.CARTO_SESSIONS.idFromName(logicalName);
  const sessionId = id.toString();
  const stub = env.CARTO_SESSIONS.get(id);

  const initPayload = {
    sessionId,
    worldId,
    mapName,
    sourceType,
    description,
  };

  const doRes = await stub.fetch("https://carto-session/session/init", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(initPayload),
  });

  // Bubble through DO response, but ensure sessionId is visible.
  const data = await doRes.json().catch(() => ({}));
  const merged = { ...data, sessionId };

  return new Response(JSON.stringify(merged), {
    status: doRes.status,
    headers: { "Content-Type": "application/json" },
  });
}

async function forwardToSessionDO(
  request: Request,
  env: Env,
  sessionId: string,
  doPath: string
): Promise<Response> {
  let id: DurableObjectId;
  try {
    id = env.CARTO_SESSIONS.idFromString(sessionId);
  } catch {
    return jsonError("Invalid sessionId", 400);
  }

  const stub = env.CARTO_SESSIONS.get(id);

  const init: RequestInit = {
    method: request.method,
    headers: { "Content-Type": "application/json" },
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    const text = await request.text();
    if (text && text.length > 0) {
      init.body = text;
    }
  }

  const doRes = await stub.fetch(`https://carto-session${doPath}`, init);
  const payload = await doRes.text();

  return new Response(payload, {
    status: doRes.status,
    headers: { "Content-Type": "application/json" },
  });
}

function jsonError(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

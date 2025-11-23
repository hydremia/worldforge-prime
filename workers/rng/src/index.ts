import type { Env, SingleRollSpec, BatchRollRequest } from "./rngTypes";
import { rollSingle, rollBatch, logSingle } from "./rngEngine";
import { handleHealth } from "./routes/health";

async function isAuthorized(request: Request, env: Env): Promise<boolean> {
  const header = request.headers.get("Authorization") || "";
  const token = header.replace(/^Bearer\s+/i, "").trim();
  return token !== "" && token === env.RNG_TOKEN;
}

async function jsonResponse(body: unknown, status = 200): Promise<Response> {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const { pathname } = url;

    if (pathname === "/health" && request.method === "GET") {
      return handleHealth(request, env);
    }

    if (pathname === "/roll" && request.method === "POST") {
      if (!(await isAuthorized(request, env))) {
        return jsonResponse({ error: "Unauthorized" }, 401);
      }

      let spec: SingleRollSpec;
      try {
        spec = await request.json<SingleRollSpec>();
      } catch {
        return jsonResponse({ error: "Invalid JSON" }, 400);
      }

      try {
        const result = rollSingle(spec);
        ctx.waitUntil(logSingle(env, result));
        return jsonResponse(result, 200);
      } catch (err: any) {
        return jsonResponse({ error: err?.message ?? "Roll failed" }, 400);
      }
    }

    if (pathname === "/batch" && request.method === "POST") {
      if (!(await isAuthorized(request, env))) {
        return jsonResponse({ error: "Unauthorized" }, 401);
      }

      let payload: BatchRollRequest;
      try {
        payload = await request.json<BatchRollRequest>();
      } catch {
        return jsonResponse({ error: "Invalid JSON" }, 400);
      }

      try {
        const results = await rollBatch(env, payload);
        return jsonResponse({ results }, 200);
      } catch (err: any) {
        return jsonResponse({ error: err?.message ?? "Batch roll failed" }, 400);
      }
    }

    return jsonResponse({ error: "Not found", path: pathname }, 404);
  },
};

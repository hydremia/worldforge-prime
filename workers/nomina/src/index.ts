// workers/nomina/src/index.ts
import type { Env } from "./nominaRegistry";
import { handleGenerate } from "./routes/generate";
import { handleCultures } from "./routes/cultures";
import { handleDebugCulture } from "./routes/debugCulture";

function json(obj: unknown, status = 200): Response {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export default {
  async fetch(
    request: Request,
    env: Env,
    _ctx: ExecutionContext
  ): Promise<Response> {
    const url = new URL(request.url);

    // --- Health endpoint: no auth ---
    if (url.pathname === "/health") {
      return json({ ok: true, worker: "prime-nomina" });
    }

    // --- Auth for everything else ---
    const authHeader = request.headers.get("Authorization") || "";
    const token =
      authHeader.startsWith("Bearer ")
        ? authHeader.slice("Bearer ".length).trim()
        : authHeader.trim();

    if (!env.NOMINA_TOKEN || token !== env.NOMINA_TOKEN) {
      return new Response("Unauthorized", { status: 401 });
    }

    // --- New Nomina v1 endpoints ---

    if (url.pathname === "/nomina/generate" && request.method === "POST") {
      return handleGenerate(request, env);
    }

    if (url.pathname === "/nomina/cultures" && request.method === "GET") {
      return handleCultures(request, env);
    }

    if (url.pathname === "/nomina/debug/culture" && request.method === "POST") {
      return handleDebugCulture(request, env);
    }

    // --- Legacy Phase-1 stub endpoints (kept for compatibility) ---

    if (url.pathname === "/nomina/validate" && request.method === "POST") {
      const body = await request.json().catch(() => ({} as any));
      const { name, cultureId } = body;

      // Phase 1 behavior: everything is valid
      return json({
        name,
        cultureId: cultureId || null,
        valid: true,
        reasons: [],
      });
    }

    if (url.pathname === "/nomina/seed/add" && request.method === "POST") {
      const body = await request.json().catch(() => ({} as any));
      const { cultureId, seeds } = body;

      if (!cultureId || !Array.isArray(seeds)) {
        return json(
          { error: "cultureId and seeds[] are required" },
          400
        );
      }

      // For compatibility, this uses the same pattern as the old worker.
      // Recommended: cultureId = `${species}:${culture}` so it lines up with
      // the new engine's `seeds:<species>:<culture>` pattern.
      const key = `seeds:${cultureId}`;
      await env.NOMINA_KV.put(key, JSON.stringify(seeds));

      return json({
        stored: true,
        cultureId,
        count: seeds.length,
      });
    }

    return new Response("Route not found", { status: 404 });
  },
};

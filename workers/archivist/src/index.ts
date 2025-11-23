import type { Env } from "./archivistTypes";
import { handleHealth } from "./routes/health";
import { handleReview } from "./routes/review";
import { handleStore } from "./routes/store";
import { handleEntityGet } from "./routes/entityGet";
import { handleEntitySearch } from "./routes/entitySearch";
import { handleResolve } from "./routes/resolve";

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const { pathname } = url;

    // Basic routing
    if (pathname === "/health" && request.method === "GET") {
      return handleHealth(request, env);
    }

    if (pathname === "/review" && request.method === "POST") {
      return handleReview(request, env);
    }

    if (pathname === "/store" && request.method === "POST") {
      return handleStore(request, env);
    }

    if (pathname === "/entity/get" && request.method === "GET") {
      return handleEntityGet(request, env);
    }

    if (pathname === "/entity/search" && request.method === "POST") {
      return handleEntitySearch(request, env);
    }

    if (pathname === "/resolve" && request.method === "POST") {
      return handleResolve(request, env);
    }

    return new Response(JSON.stringify({ error: "Not found", path: pathname }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  },
};

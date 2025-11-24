import { handleHealth } from './routes/health';
import { handleMapSession } from './routes/mapSession';
import { handleNode } from './routes/node';
import { handleWorld } from './routes/world';
import { handlePropose } from './routes/propose';
import { handleValidate } from './routes/validate';
import { handleWSM } from './routes/wsm';
import type { Env } from './index';

export async function routeRequest(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === '/cartographer/health') {
    return handleHealth(request, env, ctx);
  }

  if (path.startsWith('/cartographer/map/session')) {
    return handleMapSession(request, env, ctx);
  }

  if (path.startsWith('/cartographer/node/')) {
    return handleNode(request, env, ctx);
  }

  if (path.startsWith('/cartographer/world/') || path.startsWith('/cartographer/realm/')) {
    return handleWorld(request, env, ctx);
  }

  if (path.startsWith('/cartographer/propose/')) {
    return handlePropose(request, env, ctx);
  }

  if (path.startsWith('/cartographer/validate/')) {
    return handleValidate(request, env, ctx);
  }

  if (path.startsWith('/cartographer/wsm/')) {
    return handleWSM(request, env, ctx);
  }

  return new Response(JSON.stringify({ error: 'Not Found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
}

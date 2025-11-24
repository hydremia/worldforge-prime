import type { Env } from '../index';

export async function handleWorld(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  const url = new URL(request.url);
  const segments = url.pathname.split('/').filter(Boolean);

  if (segments[1] === 'world' && request.method === 'GET') {
    const worldId = segments[2];
    const body = { worldId, tree: [], note: 'World tree not yet implemented in v1 scaffold.' };
    return new Response(JSON.stringify(body), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  if (segments[1] === 'realm' && segments[3] === 'summary' && request.method === 'GET') {
    const realmId = segments[2];
    const body = { realmId, summary: 'Realm summary not yet implemented in v1 scaffold.' };
    return new Response(JSON.stringify(body), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  return new Response(JSON.stringify({ error: 'World/realm route not yet implemented.' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
}

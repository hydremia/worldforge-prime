import type { Env } from '../index';

export async function handleWSM(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === '/cartographer/wsm/propose' && request.method === 'POST') {
    const payload = await request.json().catch(() => ({}));
    const body = {
      proposalId: `wsm_prop_${Date.now()}`,
      status: 'received',
      received: payload,
      note: 'WSM proposal handling not yet implemented in v1 scaffold.'
    };
    return new Response(JSON.stringify(body), { status: 202, headers: { 'Content-Type': 'application/json' } });
  }

  return new Response(JSON.stringify({ error: 'WSM route not yet implemented.' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
}

import type { Env } from '../index';

export async function handlePropose(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  const url = new URL(request.url);
  const segments = url.pathname.split('/').filter(Boolean);
  const kind = segments[2]; // settlement | location | regions | ...

  const payload = await request.json().catch(() => ({}));

  const body = {
    kind,
    proposals: [],
    received: payload,
    note: 'Proposal generation not yet implemented in v1 scaffold.'
  };

  return new Response(JSON.stringify(body), { status: 200, headers: { 'Content-Type': 'application/json' } });
}

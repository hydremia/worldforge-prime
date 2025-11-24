import type { Env } from '../index';

export async function handleValidate(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  const url = new URL(request.url);
  const segments = url.pathname.split('/').filter(Boolean);
  const kind = segments[2]; // node | boundaries | terrain

  const payload = await request.json().catch(() => ({}));

  const body = {
    kind,
    valid: true,
    errors: [],
    warnings: [],
    received: payload,
    note: 'Validation logic not yet implemented in v1 scaffold.'
  };

  return new Response(JSON.stringify(body), { status: 200, headers: { 'Content-Type': 'application/json' } });
}

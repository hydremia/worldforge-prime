import type { Env } from '../index';

export async function handleHealth(_request: Request, _env: Env, _ctx: ExecutionContext): Promise<Response> {
  const body = { ok: true, service: 'cartographer', version: 'v1.0.0' };
  return new Response(JSON.stringify(body), { status: 200, headers: { 'Content-Type': 'application/json' } });
}

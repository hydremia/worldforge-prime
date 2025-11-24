import type { Env } from '../index';

export async function handleNode(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  const url = new URL(request.url);
  const segments = url.pathname.split('/').filter(Boolean);
  const nodeId = segments[2]; // /cartographer/node/{nodeId}/...

  if (segments.length === 3 && request.method === 'GET') {
    // Basic describe stub
    const body = { nodeId, summary: 'Node description not yet implemented in v1 scaffold.' };
    return new Response(JSON.stringify(body), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  if (segments.length === 4 && segments[3] === 'environment' && request.method === 'GET') {
    // Simple environment placeholder
    const body = {
      nodeId,
      biome: 'unknown',
      terrain: 'unknown',
      climate: { band: 'temperate', modifiers: [] },
      elevation: 1,
      hazard: 0,
      magicSaturation: 0
    };
    return new Response(JSON.stringify(body), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  return new Response(JSON.stringify({ error: 'Node route not yet implemented.' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
}

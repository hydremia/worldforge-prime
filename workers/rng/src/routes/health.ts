import type { Env } from "../rngTypes";

export async function handleHealth(_request: Request, _env: Env): Promise<Response> {
  return new Response(
    JSON.stringify({ ok: true, service: "rng", version: "v1.0.0" }),
    { headers: { "Content-Type": "application/json" } }
  );
}

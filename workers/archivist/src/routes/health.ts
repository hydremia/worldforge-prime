import type { Env } from "../archivistTypes";

export async function handleHealth(_request: Request, _env: Env): Promise<Response> {
  return new Response(
    JSON.stringify({ ok: true, service: "archivist", version: "v1.0.0" }),
    { headers: { "Content-Type": "application/json" } }
  );
}

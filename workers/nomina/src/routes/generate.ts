// workers/nomina/src/routes/generate.ts
import type { Env } from "../nominaRegistry";
import type { Gender, RarityBias, UniquenessScope } from "../nominaTypes";
import { generateNames } from "../nominaEngine";

export async function handleGenerate(
  request: Request,
  env: Env
): Promise<Response> {
  const body = await request.json().catch(() => ({} as any));

  const species = String(body.species ?? "").trim();
  const culture = String(body.culture ?? "").trim();
  const gender = (body.gender ?? "neutral") as Gender;
  const count = Number.isFinite(body.count) ? Number(body.count) : 10;
  const rarityBias = (body.rarityBias ?? "mixed") as RarityBias;
  const uniquenessScope = (body.uniquenessScope ?? "batch") as UniquenessScope;

  if (!species || !culture) {
    return new Response(
      JSON.stringify({ error: "species and culture are required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const result = await generateNames(env, {
      species,
      culture,
      gender,
      count,
      rarityBias,
      uniquenessScope,
    });

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        error: "Nomina generation failed",
        detail: err?.message ?? String(err),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

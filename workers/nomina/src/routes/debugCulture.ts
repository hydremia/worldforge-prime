// workers/nomina/src/routes/debugCulture.ts
import type { Env } from "../nominaRegistry";
import { loadTemplate, loadSeeds } from "../nominaRegistry";
import { generateNames } from "../nominaEngine";

export async function handleDebugCulture(
  request: Request,
  env: Env
): Promise<Response> {
  const body = await request.json().catch(() => ({} as any));
  const species = String(body.species ?? "").trim();
  const culture = String(body.culture ?? "").trim();
  const sampleSize = Number.isFinite(body.sampleSize)
    ? Number(body.sampleSize)
    : 20;

  if (!species || !culture) {
    return new Response(
      JSON.stringify({ error: "species and culture are required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const tmpl = await loadTemplate(env, species, culture);
  const seeds = await loadSeeds(env, species, culture);

  if (!tmpl) {
    return new Response(
      JSON.stringify({ error: `Unknown culture ${species}:${culture}` }),
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const generated = await generateNames(env, {
    species,
    culture,
    gender: "neutral",
    count: sampleSize,
    rarityBias: "mixed",
    uniquenessScope: "batch",
  });

  return new Response(
    JSON.stringify({
      species,
      culture,
      templateVersion: tmpl.version,
      patternSets: tmpl.patternSets.map((p) => p.id),
      seedCount: seeds.length,
      seedSample: seeds.slice(0, 10),
      generatedSample: generated.names,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

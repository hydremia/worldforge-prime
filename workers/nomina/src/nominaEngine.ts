// workers/nomina/src/nominaEngine.ts
import type {
  GenerateRequest,
  GenerateResult,
  NominaTemplate,
  RarityBias,
} from "./nominaTypes";
import type { Env } from "./nominaRegistry";
import { loadTemplate, loadSeeds } from "./nominaRegistry";

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function weightedRarity(
  tmpl: NominaTemplate,
  bias: RarityBias
): "common" | "uncommon" | "rare" {
  if (bias !== "mixed") return bias;
  const r = Math.random();
  const { common, uncommon, rare } = tmpl.rarity;
  if (r < common) return "common";
  if (r < common + uncommon) return "uncommon";
  return "rare";
}

function applyCaseStyle(name: string, tmpl: NominaTemplate): string {
  const style = tmpl.orthography?.caseStyle ?? "capitalized";
  if (style === "upper") return name.toUpperCase();
  if (style === "lower") return name.toLowerCase();
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export async function generateNames(
  env: Env,
  request: GenerateRequest
): Promise<GenerateResult> {
  const { species, culture, gender, count, rarityBias, uniquenessScope } =
    request;

  const tmpl = await loadTemplate(env, species, culture);
  if (!tmpl) {
    throw new Error(`No Nomina template found for ${species}:${culture}`);
  }

  const genderTemplates =
    tmpl.templates[gender] && tmpl.templates[gender].length > 0
      ? tmpl.templates[gender]
      : tmpl.templates.neutral;

  if (!genderTemplates || genderTemplates.length === 0) {
    throw new Error(
      `No templates for gender ${gender} (or neutral fallback) in ${species}:${culture}`
    );
  }

  const patternSets = tmpl.patternSets;
  if (!patternSets || patternSets.length === 0) {
    throw new Error(`No patternSets defined for ${species}:${culture}`);
  }

  const seenBatch = new Set<string>();
  const resultNames: string[] = [];

  // Seeds loaded for future QA/collision expansion (not strictly used yet)
  const _seeds = await loadSeeds(env, species, culture);

  const effectiveCount = Math.max(1, Math.min(count, 100));
  let safety = 0;
  const safetyLimit = effectiveCount * 20;

  while (resultNames.length < effectiveCount && safety < safetyLimit) {
    safety++;

    const rarityBucket = weightedRarity(tmpl, rarityBias);
    // v1.0: rarityBucket reserved for future tuning (e.g., weighting patternSets)

    const pattern = pick(genderTemplates);
    const pset = pick(patternSets);

    const prefix = pset.syllables.prefix;
    const core = pset.syllables.core;
    const suffix = pset.syllables.suffix;
    const familyCore = pset.syllables.family_core ?? [];

    let name = pattern;
    if (pattern.includes("{prefix}")) {
      name = name.replace("{prefix}", pick(prefix));
    }
    if (pattern.includes("{core}")) {
      name = name.replace("{core}", pick(core));
    }
    if (pattern.includes("{suffix}")) {
      name = name.replace("{suffix}", pick(suffix));
    }
    if (pattern.includes("{family_core}") && familyCore.length > 0) {
      name = name.replace("{family_core}", pick(familyCore));
    }

    name = applyCaseStyle(name, tmpl);

    if (uniquenessScope === "batch" && seenBatch.has(name)) {
      continue;
    }

    seenBatch.add(name);
    resultNames.push(name);
  }

  return {
    species,
    culture,
    gender,
    count: resultNames.length,
    names: resultNames,
    rarityBias,
    uniquenessScope,
  };
}

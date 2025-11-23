// workers/nomina/src/routes/cultures.ts
import type { Env } from "../nominaRegistry";
import { loadTemplate, loadSeeds } from "../nominaRegistry";

interface CultureDescriptor {
  species: string;
  culture: string;
  aliases?: string[];
}

// Must match KV keys:
//   template:<species>:<culture>
//   seeds:<species>:<culture>
const CULTURES: CultureDescriptor[] = [
  // Elves
  { species: "elf", culture: "high_elf" },
  { species: "elf", culture: "wood_elf" },
  { species: "elf", culture: "drow" },

  // Dwarves
  { species: "dwarf", culture: "shield_dwarf" },
  { species: "dwarf", culture: "gold_dwarf" },

  // Halflings
  { species: "halfling", culture: "lightfoot_halfling" },
  { species: "halfling", culture: "strongheart_halfling" },

  // Gnomes
  { species: "gnome", culture: "forest_gnome" },
  { species: "gnome", culture: "rock_gnome" },

  // Dragonborn
  { species: "dragonborn", culture: "chromatic_dragonborn" },
  { species: "dragonborn", culture: "metallic_dragonborn" },

  // Orcs + Half-Orcs
  { species: "orc", culture: "gray_orc" },
  { species: "orc", culture: "mountain_orc" },
  { species: "half_orc", culture: "faerun_half_orc" },

  // Tieflings
  { species: "tiefling", culture: "infernal_tiefling" },
  { species: "tiefling", culture: "abyssal_tiefling" },

  // Humans
  { species: "human", culture: "chondathan" },
  { species: "human", culture: "illuskan" },
  { species: "human", culture: "calishite" },
  { species: "human", culture: "tethyrian" },
  { species: "human", culture: "turami" },
  { species: "human", culture: "rashemi" },
  { species: "human", culture: "damaran" },
  { species: "human", culture: "mulan" },
  { species: "human", culture: "ffolk" },
  { species: "human", culture: "uthgardt" },
  { species: "human", culture: "shaaran" },
];

export async function handleCultures(
  _request: Request,
  env: Env
): Promise<Response> {
  const results = [];

  for (const c of CULTURES) {
    const tmpl = await loadTemplate(env, c.species, c.culture);
    const seeds = await loadSeeds(env, c.species, c.culture);

    let status: "ready" | "missing_template" | "missing_seeds" = "ready";
    if (!tmpl && !seeds.length) status = "missing_template";
    else if (!tmpl) status = "missing_template";
    else if (!seeds.length) status = "missing_seeds";

    results.push({
      species: c.species,
      culture: c.culture,
      aliases: tmpl?.aliases ?? c.aliases ?? [],
      status,
      seedCount: seeds.length,
    });
  }

  return new Response(JSON.stringify({ cultures: results }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

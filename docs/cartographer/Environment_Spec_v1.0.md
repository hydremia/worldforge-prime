# Environmental System Specification — Cartographer v1.0

## 1. Overview

The environmental system defines how biomes, climate, terrain, elevation, hazard, and magic saturation (MSS) are expressed and stored in Cartographer.

These properties live in the `EnvironmentProfile` attached to WSM nodes and can be inherited down the hierarchy.

## 2. Biomes (Examples)

Biomes describe broad ecological character. Examples include:

- Temperate Forest
- Boreal / Taiga Forest
- Rainforest
- Cloud Forest
- Temperate Grassland / Prairie
- Steppe
- Savannah
- Meadowlands
- Hot Desert (dune)
- Rocky Desert
- Badlands
- Salt Flats
- Scrublands
- Alpine
- Craglands
- Volcanic
- Highlands
- Frozen Peaks
- Marsh / Swamp / Bog / Fen / Mangrove
- Tundra / Subpolar Barrens
- Icefield / Glacier
- Rocky Coast / Sandy Coast / Reef Coast
- Open Ocean / Kelp Forest / Abyssal Depths
- Mildly magical variants: Fey-Touched Forest, Shadow-Tainted Wood, Blightlands, Wild-Magic Patches, Arcane Craterlands

## 3. Climate

Climate uses bands and modifiers:

- `band`: `tropical`, `subtropical`, `temperate`, `continental`, `subpolar`, `polar`
- `modifiers`: `arid`, `semi_arid`, `humid`, `monsoon`, plus altitude descriptors such as `highland` and `alpine`.

Magical climate tags (stored in `tags[]`) can include:

- `fey_infused`
- `shadow_blighted`
- `blighted`
- `stormbound`

## 4. Terrain

Terrain captures more tactical feel than biome. Examples:

- Open: plains, rolling_hills, steppe, meadowlands
- Rugged: highlands, mountainous, craglands, volcanic
- Forest: light_forest, dense_forest, jungle
- Wet: marsh, swamp, bog, fen, mangrove
- Arid: sand_dunes, rocky_desert, badlands, salt_flats
- Coastal/Water: rocky_coast, sandy_coast, riverlands, lake_district, reef_shelf
- Cold: tundra_flats, icefield, glacier
- Magical (mild): fey_touched_lands, shadow_scarred_terrain, blightlands, wild_magic_patches, arcane_craterlands

## 5. Elevation

Elevation is stored as a simple band from 0–5:

- 0 — Sea Level
- 1 — Lowland
- 2 — Midland
- 3 — Highland
- 4 — Alpine
- 5 — Supernatural / Unnatural

## 6. Hazard Level

Hazard is modeled as a coarse 0–3 scale:

- 0 — Safe
- 1 — Mild
- 2 — Dangerous
- 3 — Deadly

This is used for route difficulty, encounter tuning, and worldgen logic.

## 7. Magic Saturation Score (MSS)

MSS is a 0–100 score representing magical “density” in a region. It is derived from factors such as:

- Biome and terrain
- Regional tags (e.g., `ley_convergence`, `mythal`, `shadow_scar`)
- Realm-level auras
- Clusters of magical locations

MSS bands loosely map to probability of magical phenomena:

- 0–10 → ~0–1%
- 11–25 → ~2–5%
- 26–40 → ~5–10%
- 41–60 → ~10–20%
- 61–80 → ~20–35%
- 81–100 → ~40–60%

Precise usage is left to DM/Creative logic; Cartographer only stores and exposes MSS.

## 8. Inheritance for Locations

Locations inherit environment by default from their parent node. Overrides occur when:

- A specific environment is declared for the Location.
- Tags force overrides (`underground`, `volcanic`, `shadow`, `planar`, etc.).
- The Location type logically implies a different environment (e.g., a cavern).

This keeps the system flexible but consistent.

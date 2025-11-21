# Phase 2 Roadmap — Worldforge Prime (v1.0)

This roadmap defines the major initiatives, expansions, integrations, and deeper system buildouts planned for **Phase 2** of the Worldforge Prime project. Phase 2 begins once Phase 1 is fully completed and the ecosystem structure is stable.

---
# 0. Phase 2 Goals (High-Level)

- Expand Tier-1 canon dramatically via **World Anvil ingestion**.
- Build out the **Prime Archivist Worker** to full operational capability.
- Stand up the **Prime Nomina Worker**, including cultural templates and seed libraries.
- Begin **Cartographer Phase 2** (region manifests + travel logic + adjacency schema).
- Introduce **Prime OPS auditing** for multi-world and multi-campaign integrity.
- Establish long-term “Worldforge Prime Era” data governance practices.
- Provide bi-directional GPT ↔ Worker coherence for canonical data.

Phase 2 is the transition from **structure + baselines** to **real content + automation**.

---
# 1. World Anvil Import Pipeline

World Anvil (WA) integration is the foundation of Phase 2 canon expansion.

### 1.1 WA Export Parsing
- Accept WA export ZIP (Markdown/HTML or JSON export depending on WA settings).
- Auto-detect article types: NPCs, locations, regions, organizations, timelines.
- Strip WA formatting artifacts.

### 1.2 WA → Prime Mapping
Each WA article must be mapped to Prime’s canon schema:
- regions → `canon/worlds/FR/geography/regions/`
- factions → `canon/worlds/FR/factions/`
- NPCs → `canon/worlds/FR/npcs/`
- cities/towns → `canon/worlds/FR/geography/locales/`
- timelines → `canon/worlds/FR/timelines/`
- myths/legends → `canon/worlds/FR/lore/`
- campaign-specific → under `canon/worlds/FR/campaigns/<CampaignName>/`

### 1.3 Conflict Resolution Layer
- Identify contradictions with Prime baseline or newer user canon.
- Flag articles for manual review.
- Suggest merges, overrides, or campaign-specific branches.

### 1.4 Auto-Canonization
- Convert WA articles into MD files matching Prime structure.
- Embed frontmatter (`id`, `canon_tier`, `source`, `world`, `tags`).
- Bulk store using Archivist Worker.

### 1.5 Import Logs & Integrity Checks
- Produce a digest of all imported articles.
- Summaries of new IDs created.
- Warnings for unresolved conflicts or malformed entries.

---
# 2. Prime Archivist Worker (Full Build)

### 2.1 Core Functions
- `POST /fetch` – retrieve canon entries by ID, path, world, or type
- `POST /store` – add/update canon entries
- `POST /query` – advanced filtering (tags, ranges, types)
- `POST /diff` – compare entries or timelines

### 2.2 Data Model & Namespaces
- World-level KV buckets: `WF_PRIME_ARCHIVIST_CANON:<World>`
- Campaign-level namespaces
- Storage format: JSON w/ MD mirrors

### 2.3 Canon Lineage Tracking
- `source` → WA, Prime improv, user-provided
- `version` → canonical revision number
- `history` → list of edits, merge decisions, overrides

### 2.4 Integration with GPT
- Prime uses Archivist Worker for **Tier-1 retrieval**
- Fallback rules for Worker failure or missing data

---
# 3. Nomina Worker Expansion

### 3.1 Implement Worker
- `POST /generate` – core name generator
- `POST /validate` – check names against canon + seeds
- `POST /seed/add` – add new seeds

### 3.2 Template Library Build-Out
- Define naming cultures for all major FR species and subcultures:
  - elf_high, elf_wood, elf_drow, elf_eladrin
  - human_chondathan, human_tethyrian, human_calishite, human_damaran
  - dwarf_shield, dwarf_gold, dwarf_duergar
  - halfling_lightfoot, halfling_stout
  - gnomish_forest, gnomish_rock
  - dragonborn_variants, tiefling_variants
- Add JSON templates for each

### 3.3 Seed Library
- Curated JSONL files for each culture
- Add Tier-1 canon names from WA import

### 3.4 Schema Enforcement
- Validate every template against `nomina_template.schema.json`
- Validate every seed entry against seed schema

---
# 4. Cartographer Phase 2 (Region Manifests + Travel Logic)

### 4.1 Region Manifest Implementation
- Adopt `region_manifest.schema.json`
- Create region manifests for:
  - Sword Coast
  - The North
  - Dalelands
  - Moonsea
  - Cormyr
  - Amn/Tethyr/Calimshan
  - Chult
  - Anauroch
  - Underdark (multi-layered)

### 4.2 Adjacency Graphs
- Define adjacency for each region
- Travel modifiers (terrain, danger level, magic influence)
- Seasonal variation hooks

### 4.3 Travel Time Engine
- Worker calculates travel by foot, mount, caravan, ship, air, magic
- Optional GM override parameters

### 4.4 Map Metadata
- Define map keys for future visual tool integration
- Support for layering (biomes, political borders, ancient overlays)

---
# 5. Prime OPS Worker (Governance & Integrity)

### 5.1 Core Functions
- `GET /version`
- `POST /qgate`
- `POST /diagnostic`
- `POST /integrity/world`
- `POST /integrity/campaign`

### 5.2 QGate Phases (Prime Variant)
- Instruction layer validation
- Schema validation (Archivist + Nomina + Cartographer)
- Canon folder audit
- Worker availability check

### 5.3 Canon Consistency Engine
- Detect divergence between MD and KV versions
- Auto-suggest fixes

---
# 6. Campaign Framework Expansion

### 6.1 Campaign Folder Structure
- Expand `/canon/worlds/FR/campaigns/`
- Add templates for:
  - campaign `_index.md`
  - events.md
  - npcs.md
  - locations.md
  - factions.md

### 6.2 Campaign Hooks Engine
- Worker query support for campaign-only canon
- Cross-referencing global canon with local variations

### 6.3 Prime DM Mode Extensions
- Story arcs
- Quest node linking
- Region-aware encounter generation (via Cartographer)

---
# 7. Visual & Media Integration (Optional Phase 2 Tasks)

### 7.1 Atelier Worker (If implemented)
- Metadata management for concept art / region art / item art
- Lineage consistency checks

### 7.2 Map Rendering (Optional)
- Integrate with Cartographer manifests
- Generate GM maps vs player maps

---
# 8. Phase 2 Exit Criteria

Phase 2 is complete when:
- WA import pipeline is functional and tested
- Archivist Worker is fully operational
- Nomina Worker is fully operational with template+seed libraries
- Cartographer Worker supports region manifests + travel logic
- OPS Worker supports QGate + integrity validation
- GPT ↔ Worker cycle is stable and reliable
- At least one region and one campaign imported from WA or manual canon

---
# 9. Notes & Future Prep

- Phase 3 will handle **multi-world expansion**, **Atelier integration**, and **external contributor support**.
- Phase 2 is the content-heavy phase and should be considered "Prime World Genesis".

---
This file is designed to evolve as tasks are refined or split. Add new sub-sections as needed.


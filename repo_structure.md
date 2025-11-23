# worldforge-prime — Repo & Runtime Manifest (v1.1)

> Canonical map of the **Worldforge Prime** repo and its live runtime surfaces.  
> This file is the **source of truth** for folder layout, workers, KV bindings, and schema locations.

---

## 1. Repo Tree (high-level)

```text
worldforge-prime/
  README.md                         # high-level entrypoint
  repo_structure.md                 # this file (repo + runtime manifest)
  wrangler.json                     # Wrangler config
  MASTER_DOC.md                     # (future) exported Prime master doc

  /meta/                            # repo-wide governance & logs
    PRIME_VERSION_LOG.md            # canonical version log for Prime

  /docs/                            # subsystem overviews & design docs
    nomina_system_overview_v1_0.md  # Nomina subsystem doc

  /schemas/                         # JSON/OpenAPI schemas
    prime_nomina_openapi_v1_0.json  # Nomina worker OpenAPI v1.0
    nomina_template_schema.json     # Nomina template schema
    archivist_payload_schema.json   # Archivist payload schema (draft)
    prime_action_schema_stubs.json  # Prime action schema stubs

  /instructions/                    # core Prime instructions & guidance
    prime_core_block_outline.md
    prime_core_block_final.md
    prime_extended_instructions.md
    prime_mode_templates.md
    prime_conversation_starters.md

  /roadmaps/                        # Prime roadmaps & guides
    phase_1_normalized_roadmap.md
    phase_2_roadmap.md
    worldforge_prime_master_doc.md
    worldforge_prime_phase_1_rebuild_guide.md

  /Project Files/                   # imported/given spec docs for Prime
    PRIME_OUTPUT_STANDARDS.md
    PRIME_MODES.md
    PRIME_TOOL_USAGE.md
    PRIME_SAFETY_AND_CONSISTENCY.md
    PRIME_LORE_HIERARCHY.md
    PRIME_IDENTIFY.md
    README_DEV_PROJECT.md

  /nomina/                          # Nomina data (templates + seeds)
    /templates/
      <species>/<culture>.json      # e.g. elf/high_elf.json
    /seeds/
      <species>/<culture>.jsonl     # e.g. elf/high_elf.jsonl

  /workers/
    /nomina/
      README.md                     # Nomina worker spec
      /src/
        index.ts                    # CF Worker entrypoint
        nominaTypes.ts              # shared TS types/interfaces
        nominaRegistry.ts           # KV access helper (NOMINA_KV)
        nominaEngine.ts             # name generation logic
        /routes/
          generate.ts               # POST /nomina/generate
          cultures.ts               # GET  /nomina/cultures
          debugCulture.ts           # POST /nomina/debug/culture

  /worlds/                          # setting/lore content (FR etc.)
    /FR/
      index.md
      /factions/
      /geography/
      /pantheon/

  /canon/                           # (future) Prime-aligned canon slices
    readme.md

  /.wrangler/                       # local Wrangler state (KV cache etc.)
  /node_modules/                    # node dependencies (local dev)
  /legacy/                          # (future) archived older WF artifacts

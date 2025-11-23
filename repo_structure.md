# worldforge-prime — Repo & Runtime Manifest (v1.0)

> Canonical map of the **Worldforge Prime** repo and its live runtime surfaces.  
> This file is the **source of truth** for folder layout, workers, KV bindings, and schema locations.

---

## 1. Repo Tree (high-level)

```text
worldforge-prime/
  README.md
  repo_structure.md                 # this file
  MASTER_DOC.md                     # exported Worldforge Prime master document

  /instructions/                    # core Prime instructions & guidance
  /roadmaps/                        # phase roadmaps, trackers, checklists
  /schemas/                         # OpenAPI + JSON schemas for tools/workers

  /nomina/
    /templates/                     # species/culture Nomina templates (JSON)
    /seeds/                         # species/culture Nomina seeds (JSONL)

  /workers/
    /nomina/
      README.md                     # Nomina worker spec
      /src/
        index.ts                    # CF Worker entrypoint
        nominaTypes.ts              # shared TS types/interfaces
        nominaRegistry.ts           # KV access helper
        nominaEngine.ts             # name generation logic
        /routes/
          generate.ts               # POST /nomina/generate
          cultures.ts               # GET  /nomina/cultures
          debugCulture.ts           # POST /nomina/debug/culture

  /canon/                           # (future) Prime-aligned setting & lore
  /legacy/                          # archived older WF artifacts (non-Prime)

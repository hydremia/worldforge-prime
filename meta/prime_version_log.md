# Worldforge Prime — Master Version Log

This document tracks all version changes to the Worldforge Prime system across its entire lifecycle. It consolidates milestones, feature additions, schema changes, worker upgrades, UX expansions, multi-user systems, and OPS/QGate evolutions. This is intended to be the single authoritative version history for Prime.

---

## 📍 VERSION: v1.0.0 — Baseline Established (2025-11-22)

### Summary
Prime v1.0 establishes the core scaffolding, instruction stack, and worker integration necessary for future phases. This version contains no production-grade features yet, but lays the full structural foundation of the Prime ecosystem.

### Included Components
- Full Prime instruction layer:
  - PRIME_OUTPUT_STANDARDS
  - PRIME_MODES
  - PRIME_TOOL_USAGE
  - PRIME_SAFETY_AND_CONSISTENCY
  - PRIME_LORE_HIERARCHY
  - PRIME_IDENTIFY

- Worker integrations (authenticated + functional):
  - Archivist Worker (canon I/O)
  - OPS Worker (QGate + diagnostics)
  - API Worker (runtime I/O backbone)
  - Nomina Worker (placeholder implementation)
  - Cartographer Worker (placeholder implementation)

- Dev Project artifacts:
  - /instructions/, /schemas/, /test_data/, /nomina_dev/
  - GitHub repository integration
  - Cloudflare KV namespaces prepared

### Features Present
- Canon retrieval and storage via Archivist Worker
- Capsule creation via API Worker
- Mode switching (DM, Creative, Cartographer, Ops)
- Canon hierarchy enforcement (Tier 1-3)
- Safety and consistency standards

### Features Not Yet Present
- Real Nomina engine
- Cartographer schemas or region graph
- WA import pipeline
- UX menus, capsules, or quick actions
- Multi-user support
- Sandboxed environment isolation

---

## 📌 NEXT TARGET: v1.1.0 — Phase 2 Feature Activation
Planned for:
- Nomina Engine v1
- Cartographer Schemas + Worker
- WA Import (Parser)
- UX (Initial Menus + Quick Actions)
- OPS Enhancements

Entries will be added as milestones are completed.

## 2025-11-23 — Nomina Worker v1.0 Online

**Prime Version Window:** 1.0.x  
**Subsystem:** Nomina (Name Engine)

### Worker & Infrastructure

- Worker: `worldforge-prime-nomina`
- Source: `workers/nomina/src/*`
- Mode: ES Modules
- Auth: `NOMINA_TOKEN` bearer token (all endpoints except `/health`)
- KV Namespace: `WF_PRIME_NOMINA_SETS` (binding: `NOMINA_KV`)
- API Schema: `schemas/prime_nomina_openapi_v1_0.json`
- Subsystem Doc: `docs/nomina_system_overview_v1_0.md`

### KV Corpus

- Installed ~54 KV pairs for templates and seeds.
- Key patterns:
  - `template:<species>:<culture>`
  - `seeds:<species>:<culture>`
- Source of truth in repo:
  - `nomina/templates/<species>/<culture>.json`
  - `nomina/seeds/<species>/<culture>.jsonl`
- Bulk upload performed via Wrangler v4 with `--remote` and explicit namespace ID.

### Functionality Validated

- `GET /health` returns `{"ok":true,"worker":"prime-nomina"}`.
- `POST /nomina/generate`:
  - Authenticated with `NOMINA_TOKEN`
  - Verified generation for `elf/high_elf` (female), e.g.:

    ```json
    {
      "species": "elf",
      "culture": "high_elf",
      "gender": "female",
      "count": 3,
      "names": ["Alathas", "Alathir", "Drielos"],
      "rarityBias": "mixed",
      "uniquenessScope": "batch"
    }
    ```

- `GET /nomina/cultures`:
  - Returns readiness status per species/culture.
  - Confirms templates + seeds present for all configured cultures.

- `POST /nomina/debug/culture`:
  - Returns template metadata, seed counts, and generated samples for QA.

### Legacy Endpoints

- `/nomina/validate`:
  - Retained as a stub (always `valid=true`) for compatibility with earlier experiments.
- `/nomina/seed/add`:
  - Retained for ad hoc seed pushes; v1.0 prefers bulk KV load via repo + Wrangler.

### Governance Notes

- Nomina v1.0 is considered part of the Prime 1.0–2.0 baseline.
- Any breaking changes to the Nomina API or KV structure must:
  - Update `prime_nomina_openapi_v1_0.json` (or introduce a v1.1/v2.0 file).
  - Update `docs/nomina_system_overview_v1_0.md` (or successor).
  - Add a new section to this log outlining the change and impact on GPT tooling.

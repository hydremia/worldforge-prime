# Worldforge Prime — Phase 2 Roadmap (Updated v2.0)

> **Status Overview:** This file consolidates the full original Phase 2 roadmap (filecite‹turn3file0›) with all completed work and updated future requirements.
> Every item is marked **✔️ Complete**, **🔄 In Progress**, **⏳ Pending**, or **➡️ Moved to Phase 3**.

---

# ✅ 1. NOMINA EXPANSION (Phase 2 Core)

## 1.1 Templates — **✔️ Complete**
- All cultural templates created.
- Stored in `/nomina/templates/<species>/<culture>.json`.
- JSON schema validity confirmed.
- Weighted patterns, aliases, rarity profiles included.
- Required repo structure standardized.

## 1.2 Seed Libraries — **✔️ Complete**
- Full seed lists (100+ per culture) built.
- Stored in `/nomina/seeds/*.jsonl`.
- Bulk upload to KV via Wrangler (`--remote`).
- Verified via `/nomina/cultures` readiness.

## 1.3 Nomina Worker — **✔️ Complete**
- `worldforge-prime-nomina` Worker deployed.
- KV binding `NOMINA_KV` active.
- Real generation logic online.
- Endpoints operational:
  - `/health`
  - `/nomina/generate`
  - `/nomina/cultures`
  - `/nomina/debug/culture`
- OpenAPI schema created.
- Full doc added under `/docs/`.
- Version log updated under `/meta/`.

Nomina is **fully sealed** for Phase 2.

---

# 🔄 2. CARTOGRAPHER INITIATION (Phase 2 Required)

## 2.1 Schema Layer — **⏳ Pending**
- `region_manifest.schema.json` — not yet created.
- `adjacency.schema.json` — not yet created.
- Will live under `/schemas/`.

## 2.2 Cartographer Worker — **⏳ Pending**
- Worker name: `worldforge-prime-cartographer`.
- KV: `WF_PRIME_CARTOGRAPHER_REGIONS`.
- Endpoints planned:
  - `/region/store`
  - `/region/get`
  - `/region/list`
  - `/region/search`
  - `/region/adjacency`
- Auth token needed.
- Code scaffolding needed.

## 2.3 FR Region Baseline — **➡️ Moved to Phase 3**
Due to complexity and Archivist ordering.

---

# ➡️ 3. WORLD ANVIL IMPORT PIPELINE — Moved to Phase 3
The entire WA import and conflict detection system needs:
- Archivist Worker completed
- Canon payload schema finalized
- Region + NPC structure finalized

Therefore, WA Import = **Phase 3 task**.

---

# 🔄 4. PRIME UX DEVELOPMENT

## 4.1 Prime Main Menu — **⏳ Pending**
Needs:
- Updated Nomina/Archivist actions
- Standardized Prime Mode templates
- UX guidelines from Phase 1 files

## 4.2 Campaign Capsules — **⏳ Pending → Phase 3**
Requires multi-user segmentation + Archivist ingestion.

---

# 🔄 5. OPS & QGATE EVOLUTION (Partial Phase 2)

## 5.1 Test Automation — **⏳ Pending**
- Worker health checks for Nomina added informally (manual).
- Automated systems not yet implemented.

## 5.2 Monitoring Layer — **➡️ Phase 3**
- Full KV audit not yet built.
- Canon drift detection = Phase 3.

---

# 📌 Phase 2 — Updated Completion Criteria

Phase 2 ends when these are complete:

1. **Archivist Worker online (Phase 2 remaining core)**
2. **Cartographer Worker scaffolding + schemas complete**
3. **Prime GPT updated with Nomina + Archivist OpenAPI actions**
4. **Repo structure finalized**
5. **All Phase 2 documentation added**

Phase 3 will then handle:
- FR region canonicalization
- WA import pipeline
- UX and capsule systems
- Canon conflict detection
- Large-scale OPS automation

---

# 📂 Deliverables Already Produced in Phase 2
- Nomina worker code (`/workers/nomina/src/`)
- Nomina KV corpus (54 pairs) uploaded
- Nomina OpenAPI spec (`/schemas/prime_nomina_openapi_v1_0.json`)
- Nomina system documentation (`/docs/nomina_system_overview_v1_0.md`)
- Version log updated (`/meta/PRIME_VERSION_LOG.md`)
- Repo structure refined (`repo_structure.md`)

---

# 📌 What’s Next (Immediate Next Thread)
- **Begin Phase 2 — Archivist Worker Buildout**
  - Worker scaffolding
  - KV setup
  - Initial payload schema
  - /review, /store, /resolve endpoints
  - OpenAPI schema + documentation
  - Repo updates

Once Archivist Worker is live and stable, we will:

- Return to Cartographer Worker
- Inject Archivist + Nomina tools into Prime GPT
- Finalize Phase 2

---

# End of Phase 2 Updated Roadmap (v2.0)


# Worldforge Prime — Phase 3 Roadmap (Initial Draft v1.0)

> This file establishes the **initial Phase 3 roadmap** for Worldforge Prime. It consolidates all known future tasks, unresolved dependencies from Phase 2, and large-scale systems that cannot be completed until the Archivist Worker and Cartographer scaffolding are live.
>
> This is not final — Phase 3 will evolve as Phase 2 completes — but this draft captures all known/planned Phase 3 deliverables to date.

---

# 🚀 PHASE 3 — CORE OBJECTIVES

Phase 3 is a **major expansion phase**. Its role is to unify the ecosystem once the Archivist Worker and Cartographer Worker are functional, enabling:

- Canon ingestion & lineage
- Region-level canonicalization
- Multi-user capsule architecture
- World Anvil import + conflict resolution
- Deeper OPS automation
- Prime GPT stabilization + UX upgrade
- Nomina & Cartographer integration into runtime flows

All Phase 3 outputs are intended for **Prime v1.5–2.0**.

---

# 📘 1. ARCHIVIST PHASE 3 DELIVERABLES

> Phase 3 is where the Archivist becomes truly powerful.

## 1.1 Canon Ingestion Pipeline — **Core Phase 3**
- WA export → ingestion
- Filemap detection
- Lineage linking
- Canon flagging
- Metadata extraction
- Full ETL pipeline

## 1.2 Canon Conflict Detection Layer — **Core Phase 3**
- Duplicate entity detection
- Region + NPC + Faction conflict resolution
- Timestamp-driven lineage
- Multi-source merge strategy

## 1.3 Archivist Schema Expansion — **Core Phase 3**
- Canon entity schema (Region, NPC, Faction, Item, Lore Node)
- Relationship schema (Parent/Child, Linked Canon)
- Provenance schema

## 1.4 Archivist → Cartographer Integration — **Phase 3**
- Region manifests auto-updated
- Mapping lineage stored in Archivist KV

## 1.5 Archivist → OPS Integration — **Phase 3**
- QGATE hooks for Archivist
- Automated QA reports

---

# 🗺️ 2. CARTOGRAPHER PHASE 3 DELIVERABLES

## 2.1 Region Canonicalization Pass — **Core Phase 3**
- All major FR regions processed:
  - Sword Coast North
  - Western Heartlands
  - Dalelands
  - Cormyr
  - Anauroch
  - etc.
- Region manifests stored in Cartographer KV
- Validated via region schema

## 2.2 Adjacency Graph System — **Core Phase 3**
- Adjacency map stored as graph JSON
- Worker endpoint for querying
- Integration with Archivist

## 2.3 Region-Based Capsule Routing — **Phase 3**
- Capsules gain region-awareness
- DM GPT can request region manifests directly

---

# 🧬 3. NOMINA PHASE 3 DELIVERABLES

## 3.1 Isolation Rules — **Phase 3**
- Rare/isolated species mechanics
- Culture drift modifiers

## 3.2 Collision-Aware Name Generation — **Phase 3**
- Archivist-backed collision checks
- Cross-capsule uniqueness

## 3.3 Rarity Calibration — **Phase 3**
- Campaign settings influence rarity weights
- Region-specific naming overrides

---

# 🧩 4. PRIME GPT PHASE 3 DELIVERABLES

## 4.1 Dynamic UX System — **Core Phase 3**
- New Prime main menu (multi-user friendly)
- Intelligent mode routing (Guide / Create / OPS / Runtime)
- Integration of Archivist & Nomina OpenAPI actions

## 4.2 Conversation Capsule System — **Core Phase 3**
- Capsules tied to session tokens
- Branchable session trees
- Cross-capsule memory

## 4.3 Multi-User Support — **Core Phase 3**
- Username + PIN login
- Capsule partitioning per user
- Canonical writes protected behind OPS

## 4.4 Campaign Runtime Canon Integration — **Phase 3**
- DM GPT receives canonical region + NPC data
- Runtime engine can request Archivist facts

---

# ⚙️ 5. OPS PHASE 3 DELIVERABLES

## 5.1 Unified QGATE for Entire Ecosystem — **Core Phase 3**
- Nomina → Archivist → Cartographer → Prime
- Full system-level QGATE reports
- Regression testing
- Endpoint monitoring

## 5.2 Worker State Auditing — **Phase 3**
- KV drift detection
- Schema drift detection
- Canon sanity checks

## 5.3 Promotion Workflow System — **Phase 3**
- Version promotion gates
- Worker rebuild verification
- Canon approval workflows

---

# 🌐 6. WORLD ANVIL IMPORT + MIGRATION

> This is one of the biggest tasks in WF Prime.

## 6.1 WA → Canon Import Pass — **Core Phase 3**
- Regions
- NPCs
- Timelines
- Quests / Story arcs
- Items
- Factions

## 6.2 Conflict Resolution Pass — **Core Phase 3**
- Duplicate entries
- Split/merge logic
- Canon overwrite rules

## 6.3 Canon Export System — **Phase 3**
- Export to GitHub + Worlds folder
- Full JSON manifests

---

# 🏛️ 7. FOUNDATION & TOOLING

## 7.1 Repo Restructuring Final Pass — **Phase 3**
- Finalize `/meta`, `/docs`, `/schemas`, `/workers`, `/canon`, `/worlds`
- Automated repo structure validator

## 7.2 Documentation Layer — **Phase 3**
- Archivist system overview (mirroring Nomina docs)
- Cartographer system overview
- Canon ingestion guide

## 7.3 Prime API Gateway (Optional Phase 3/4 Bridge)
- Single router over CF
- Tool aggregation
- Rate limiting per-GPT

---

# 🧱 8. QUALITY + TEST SYSTEMS

## 8.1 Test Harness for Workers — **Phase 3**
- Nomina
- Archivist
- Cartographer

## 8.2 Regression Suite — **Phase 3**
- For canonical data
- For naming corpus
- For region adjacency

## 8.3 Performance & Load Tests — **Phase 3**
- Stress test KV
- Large WA imports
- Multi-user runtime

---

# 🗂️ 9. EXPECTED PHASE 3 DELIVERABLE LIST

- Archivist Worker v1.0
- Archivist OpenAPI + docs
- Cartographer Worker v1.0
- Cartographer schemas (region, adjacency)
- FR region canonicalization (first wave)
- Canon ingestion pipeline v1.0
- WA import tools
- Prime v1.5 UX
- Capsule system foundation
- Multi-user baseline
- OPS QGATE v2.0
- Full system-level testing setup
- Repo structure finalization

---

# 📌 Phase 3 Exit Criteria

Phase 3 is complete when:

- Archivist + Cartographer are fully online
- Canon ingestion + conflict detection are functional
- WA import pipeline can load at least one full region + NPC + faction set
- Prime supports multi-user capsule-based UX
- OPS validates all workers + schemas
- Prime 2.0 can be considered for ecosystem-wide alignment

---

# End of Phase 3 Initial Roadmap (v1.0)

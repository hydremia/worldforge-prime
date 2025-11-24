# **Worldforge Prime — Phase 3 Roadmap (v2.0 Updated)**
### *Incorporating DM Engine, Creative Engine, Phase 2 Completions, and Updated Ecosystem Integration*

---

# **0. Overview**
Phase 3 is the transition from **infrastructure-building** (Phase 2) to **runtime intelligence and canonical world operation**. With Nomina, Archivist, RNG, and soon Cartographer online, Phase 3 becomes the moment when Prime starts behaving like the fully unified, multi-engine system you originally envisioned.

Phase 3 introduces **two new major subsystems**:
- **DM Engine v1.0** — the gameplay, adjudication, and narrative runtime.
- **Creative Engine v1.0** — the structured worldbuilding, drafting, and creative-generation suite.

Both engines integrate deeply with:
- Archivist (canon)
- Cartographer (world structure)
- Nomina (naming)
- RNG (dice)
- OPS (governance)
- Prime Runtime Core (instruction layer)

This roadmap replaces and expands the **Phase 3 initial draft (v1.0)** to reflect the advanced state of Phase 2 systems.

---

# **1. Phase 2 Dependencies (Completed + In Progress)**
These are the Phase 2 deliverables feeding directly into Phase 3.

### **✔ Nomina v1.1 — COMPLETE**
### **✔ Archivist v1.0 — COMPLETE**
### **✔ RNG Worker v1.0 — COMPLETE**
### **⟳ Cartographer v1.0 — IN PROGRESS**
- Kickoff doc created
- World hierarchy design starting
- Schema + engine to be built during Cartographer thread

These components enable Phase 3’s engine work.

---

# **2. Major Phase 3 Objectives (v2.0)**
Phase 3 now revolves around the creation of three core engines:

```
DM Engine v1.0
Creative Engine v1.0
Prime Runtime Core v1.2 (Engine Integrator)
```

Each engine defines how Prime behaves, reasons, creates, and adjudicates.

---

# **3. DM ENGINE v1.0 — Full Runtime Gameplay System**
The DM Engine replaces simple “DM Mode” with a complete gameplay runtime layer.

## **3.1 DM Persona Engine**
- Adjustable tone profiles (gritty, epic, whimsical, investigative, dark)
- NPC voice styles
- Narrative density slider
- Safety tools (fade-to-black, content boundaries)

## **3.2 Encounter Engine**
Handles:
- Combat encounters
- Initiative flow
- Turn-based sequencing
- Hazard & trap logic
- Skill challenge engine
- Social conflict scaffolding

## **3.3 Adjudication Layer**
Switchable rule behavior:
- RAW
- RAI
- Cinematic
- OSR-inspired rulings
- Player-forward rulings

Includes:
- Dice arbitration using RNG Worker
- Rule conflict detection
- Reconciliation logic

## **3.4 Narrative Engine**
- Scene framing
- Beats (setup → tension → choice → outcome → consequence)
- NPC conversation engine
- Dynamic pacing adjustments

## **3.5 Exploration + Travel Engine**  *(depends on Cartographer)*
- Region → route → distance
- Travel time
- Overland hazard checks
- Weather integration (v1.1)

## **3.6 Session Capsule Engine**  *(API Worker)*
- State save/load
- Capsule-based session memory
- PC/NPC canonical updates → Archivist

DM Engine v1.0 is the largest Phase 3 deliverable.

---

# **4. CREATIVE ENGINE v1.0 — Worldbuilder & Narrative Suite**
Creative Mode evolves into a full procedural worldbuilding engine.

## **4.1 Creative Persona Engine**
- Genre sliders (high fantasy, dark fantasy, heroic, mythic, grim)
- Style profiles (Tolkien, Sanderson, Gaiman, anime-inspired, pulp)
- Aesthetic density

## **4.2 Worldbuilding Engine**
Tools for:
- Region builder
- Pantheon builder
- Item/relic builder
- Faction builder
- City/settlement builder
- Cultural builder

## **4.3 Lore Drafting Engine**
- Tier-3 improv generator
- Auto metadata tagging
- Archivist-ready format
- Canon safety checks

## **4.4 Visual Prompt Engine** *(Atelier integration)*
- Style-consistent image prompts
- Character/landscape/object prompt templates
- Multi-variation generator
- Image lineage metadata

## **4.5 Procedural Content Engine**
- Creature builder
- Rumor generator
- Quest hook generator
- Location description generator
- Dungeon seed generator

Creative Engine v1.0 is the foundation for **Creator GPT** workflows.

---

# **5. PRIME RUNTIME CORE v1.2 — Engine Integration Layer**
The Runtime Core becomes the **engine-switching brain** of Worldforge Prime.

## **5.1 Instruction Layer Reduction (<8k)**
- Extract only essential cross-engine logic
- Move all extended logic to knowledge files

## **5.2 Engine Switcher**
Maps:
```
DM Engine
Creative Engine
Ops Engine
Cartographer Engine
Guide Layer
Runtime State
```

## **5.3 Worker Routing Layer**
- Nomina
- Archivist
- Cartographer
- RNG
- OPS

## **5.4 Lore Hierarchy Enforcement**
- Tier 1 → User/World Canon
- Tier 2 → Forgotten Realms Canon
- Tier 3 → Creative improv

## **5.5 Mode-Specific Safeguards**
- DM cannot invent conflicting canon
- Creative Engine labels improv correctly
- Archivist uses lineage rules
- Cartographer enforces region consistency

Runtime Core v1.2 becomes the center of the entire GPT ecosystem.

---

# **6. Cartographer Phase 3 Enhancements**
Extends Cartographer beyond v1.0.

## **6.1 Region Canonicalization Pass**
Proactively ingest canonical regions:
- Sword Coast North
- Western Heartlands
- Dalelands
- Cormyr
- Anauroch
- etc.

## **6.2 Adjacency Graph Engine**
- Region connectivity
- Travel route graph
- Graph queries (/adjacent, /route, /distance)

## **6.3 Region-Based Capsule Routing**
DM Engine can fetch region manifests directly.

---

# **7. Archivist Phase 3 Enhancements**

## **7.1 Canon Ingestion Pipeline v1.0**
- WA → JSON full import
- Metadata extraction
- Entity type mapping

## **7.2 Conflict Detection Layer v2.0**
- NPC conflicts
- Region conflicts
- Timeline conflicts
- Canon overwrite governance

## **7.3 Archivist → Cartographer Integration**
- Region manifests auto-updated
- Parent/child relationships validated

---

# **8. OPS Phase 3 Enhancements**

## **8.1 Unified QGate v2.0**
- Nomina
- Archivist
- Cartographer
- RNG
- Prime Runtime Core
- Canon ingest + region structures

## **8.2 Worker State Auditing**
- KV drift detection
- Schema drift detection
- Canon lineage checks

## **8.3 Promotion Workflow System**
- Ecosystem-wide version promotion
- Worker rebuild verification

---

# **9. World Anvil Integration (Phase 3 Core)**

## **9.1 WA → Canon Ingestion Pass**
- Regions
- NPCs
- Items
- Factions
- Timelines
- Quests

## **9.2 Conflict Resolution Pass**
- Dupes
- Diverging versions
- Canon consolidation

## **9.3 Export System**
- Canon → GitHub manifest
- Region → Cartographer KV

---

# **10. Phase 3 Deliverable Summary**

## **ENGINE SUITE**
- DM Engine v1.0
- Creative Engine v1.0
- Runtime Core v1.2

## **WORKER SUITE**
- Cartographer Worker v1.0
- Archivist v1.1 (Phase 3 upgrades)
- RNG Worker (stable)
- Nomina v1.2 (Phase 3 enhancements)

## **INFRASTRUCTURE**
- Unified QGATE v2.0
- Region adjacency graph
- Capsule system v1.0
- Multi-user baseline

## **CANON SYSTEM**
- WA import pipeline
- Canon conflict resolver v2.0
- Region manifests canonized

---

# **11. Phase 3 Exit Criteria (Revised)**
Phase 3 is complete when:
- DM Engine v1.0 is functional and stable
- Creative Engine v1.0 is functional and stable
- Runtime Core v1.2 controls both engines accurately
- Cartographer Worker v1.0 is live and region schema validated
- Archivist supports canonical regions + major entity types
- OPS QGate v2.0 validates full system
- WA Import pipeline loads at least one full region + NPC set
- Prime UX supports engine selection + capsule workflows

At this point, **Worldforge Prime 2.0** becomes feasible.

---

# **End of Phase 3 Roadmap v2.0**


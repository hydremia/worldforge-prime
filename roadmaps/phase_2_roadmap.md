# Worldforge Prime — Phase 2 Roadmap & Execution Guide (v2.0)

## 🎯 Phase 2 Goal
Expand Worldforge Prime into a fully operational worldbuilding engine by adding:
- Real Nomina templates + naming engine
- cartographic data layer (regions, maps, adjacencies)
- World Anvil import pipeline
- UX workflows for campaigns, canon, and worldbuilding

This phase builds **capability**, not just scaffolding.

---

# 1. NOMINA EXPANSION (HIGH PRIORITY)

## 1.1 Template Creation
Create full cultural templates for:
- Elves (High, Wood, Drow*)
- Dwarves (Shield, Gold)
- Humans (Chondathan, Illuskan, Calishite, Tethyrian, Turami)
- Halflings
- Gnomes
- Dragonborn
- Orcs / Half-orcs
- Tieflings

**Tasks:**
- [ ] Auto-generate first drafts using GPT (schema-valid)
- [ ] Store in `/nomina/templates/*.json`
- [ ] Validate with `nomina_template.schema.json`
- [ ] Add example lists
- [ ] Add rarity profiles & collision scopes

**Agent Mode Recommended:**
- Syllable/phonetic distribution optimization
- Rarity balancing
- Collision reduction (party/campaign/world)
- Cultural consistency QA sweeps

---

## 1.2 Seed Libraries
Seed sets provide reference names, improve style alignment, and reduce drift.

**Tasks:**
- [ ] Build seed lists (50–200) per culture
- [ ] Store via `/nomina/seed/add` route
- [ ] Verify seeds using validate route
- [ ] Add seeds to repo under `/nomina/seeds/*.jsonl`

**Agent Mode Recommended:**
- Automatic seed clustering
- Duplicate detection
- Style anomaly detection

---

## 1.3 Real Nomina Engine (Worker Upgrade)
Replace stubs with real logic.

**Tasks:**
- [ ] Implement weighted syllable assembly
- [ ] Implement patternSets logic
- [ ] Enforce orthographic rules
- [ ] Enforce rarity profiles
- [ ] Collision prevention (culture/campaign/world)
- [ ] Add debugging routes (`/nomina/debug`)
- [ ] Add batch route (`/nomina/generate_batch`)

---

# 2. CARTOGRAPHER INITIATION (PHASE 2 CORE)

## 2.1 Schema Layer
| Schema | Purpose |
|--------|---------|
| `region_manifest.schema.json` | Core region/city metadata |
| `adjacency.schema.json` | Travel/connection graph |

**Tasks:**
- [ ] Draft both schemas
- [ ] Validate FR starter regions
- [ ] Store under `/schemas/`

---

## 2.2 Worker Layer — worldforge-prime-cartographer

**Tasks:**
- [ ] Create KV namespace `WF_PRIME_CARTOGRAPHER_REGIONS`
- [ ] Create Worker `worldforge-prime-cartographer`
- [ ] Bind KV + auth secret
- [ ] Implement:
  - `/region/store`
  - `/region/get`
  - `/region/list`
  - `/region/search`
  - `/region/adjacency`

**Agent Mode Recommended:**
- Validate adjacency graph for contradictions
- Validate canonical region data
- Auto-discover connection errors

---

## 2.3 FR Region Baseline
**Tasks:**
- [ ] Sword Coast starter set
- [ ] Amn, Tethyr, Baldur’s Gate, Waterdeep
- [ ] Roads, travel times, geography refs
- [ ] Store in canon folder + Worker via `/region/store`

---

# 3. WORLD ANVIL IMPORT PIPELINE

## 3.1 Parsing Framework
**Tasks:**
- [ ] Preprocess FA Unlimited data
- [ ] Extract articles, regions, NPCs, timelines
- [ ] Normalize to ArchivistPayload structure

## 3.2 Conflict Detection
**Tasks:**
- [ ] Compare WA entries to existing canon
- [ ] Detect conflicts
- [ ] Mark Tier-2 (external reference tier)

**Agent Mode Recommended:**
- Auto-flag conflicts
- Group duplicates
- Generate merge summaries

## 3.3 Worker Integration
**Tasks:**
- [ ] Add `/import/wa` route to an Import Worker (Phase 2.5+)
- [ ] Batch-process articles
- [ ] Store validated entries via Archivist

---

# 4. PRIME UX DEVELOPMENT (PHASE 2+)

## 4.1 Prime Main Menu
**Tasks:**
- [ ] Draft user menu structure
- [ ] Add quick actions (Add Canon, Generate Name, Region Lookup)
- [ ] Add Guide Mode

## 4.2 Campaign Capsules
**Tasks:**
- [ ] Implement campaign data containers
- [ ] Add thread-level isolation
- [ ] Store campaign keys in Worker or GPT memory

---

# 5. OPS & QGATE EVOLUTION

## 5.1 Test Automation
**Tasks:**
- [ ] Worker health checks
- [ ] Archivist validation
- [ ] Nomina regression tests
- [ ] Schema validation automation

## 5.2 Monitoring Layer
**Tasks:**
- [ ] Worker uptime tracker
- [ ] KV key audit logs
- [ ] Canon consistency reports

**Agent Mode Recommended:**
- Regular schema-compatibility checks
- Canon drift monitoring
- Metadata completeness audit

---

# Phase 2 Completion Condition
- Nomina fully functional with real templates
- Cartographer online with FR regions
- WA import pipeline ready
- Prime User Experience layer implemented
- All Workers stable with automated QA

Once these are met, Worldforge Prime transitions from development framework to a production-level worldbuilding engine.


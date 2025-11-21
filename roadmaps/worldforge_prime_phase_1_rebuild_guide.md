# Worldforge Prime — Phase 1 Rebuild Guide

*Initial population of key items based on current decisions and established plans.*

A detailed, checkbox-driven roadmap for the first phase of the Worldforge Prime rebuild. This guide is intended to define the initial setup, environment structure, architecture decisions, and preparation steps before drafting the v1.0 Core Instruction Block.

---

## ✅ Phase 1 — Foundational Rebuild Setup

### **1. Project Architecture Decisions**
- [x] Decide Project layout strategy:
  - [ ] **Option A (not selected):** Single unified Project for brainstorming + development + testing
  - [ ] **Option B (Chosen):** Two-project system:
    - [ ] Project 1: Development, brainstorming, iteration
    - [ ] Project 2: Clean testing sandbox only for validated logic
- [ ] Determine which approach we adopt for long-term scalability
- [ ] Create new Project(s) accordingly

---

## **2. Establish Worldforge Prime v1.0 Environment**
- [ ] Create the new Worldforge Prime v1.0 Custom GPT *(pending Phase 1 completion)*
- [x] Version naming strategy determined: **Prime v1.0**
- [ ] Link GPT to correct Project(s)
- [x] Confirmed: legacy instruction files will **not** be reused
- [ ] Configure initial empty Action schema**
- [ ] Create the new Worldforge Prime v1.0 Custom GPT
- [ ] Link it to the correct Project(s)
- [ ] Ensure no legacy instruction files or schemas remain
- [ ] Configure initial empty Action schema (Workers to be added later)

---

## **3. GitHub Preparation**
- [ ] Create/identify the GitHub repo branch for Prime (`prime/` namespace)
- [ ] Add MASTER_DOC.md (exported master doc)
- [ ] Initialize folder structure: `/schemas/`, `/nomina/`, `/regions/`, `/canon/`
- [x] Legacy content will be archived under `/legacy/v3.x/`
- [ ] Tag initial version once file structure is created (`prime-v1.0-init`)**
- [ ] Create/identify the GitHub repo branch for Prime
- [ ] Add a `/prime/` root folder or equivalent namespace
- [ ] Place the following initial files:
  - [ ] `MASTER_DOC.md` (export of this master document)
  - [ ] `/schemas/` folder (empty for now)
  - [ ] `/nomina/` folder (hybrid templates + seeds later)
  - [ ] `/regions/` folder (empty until Cartographer)
  - [ ] `/canon/` folder (initial lore stubs or empty)
- [ ] Archive legacy content under `/legacy/v3.x/`
- [ ] Set version tag: `prime-v1.0-init`

---

## **4. Cloudflare Worker Assessment**
- [ ] Review existing Workers from previous ecosystem
  - [ ] Archivist Worker
  - [ ] OPS Worker
  - [ ] Nomina (if exists)
  - [ ] Map/Cartographer prototypes
- [ ] Decide what to keep, rebuild, or retire:
  - [ ] Archivist Worker → **keep + update**
  - [ ] OPS Worker → **keep + update**
  - [ ] Nomina Worker → **new build (hybrid model)**
  - [ ] Cartographer Worker → **new build (Phase 2)**
- [ ] Confirm Cloudflare KV namespaces to reuse or create anew

---

## **5. Lore Strategy Initialization**
- [ ] Finalize the **3-tier lore hierarchy**:
  - [ ] Tier 1: User-created canon
  - [ ] Tier 2: Approved external sources (e.g. FRWiki)
  - [ ] Tier 3: GPT-driven improv
- [ ] Document hierarchy in `/canon/README.md`
- [ ] Ensure this hierarchy is referenced by Archivist Worker design

---

## **6. Instruction Architecture Planning (<8k constraint)**
- [ ] Define structure of the Core Instruction Block:
  - [ ] Identity statement
  - [ ] Mode descriptions
  - [ ] Tool usage rules
  - [ ] Lore hierarchy summary
  - [ ] Behavioral rules
  - [ ] Safety constraints
- [ ] Ensure final instruction block fits within **<8,000 characters**
- [ ] Begin drafting modular components inside the Project for assembly

---

## **7. Worker Action Schema Outline**
- [ ] Draft action schemas for Prime (empty stubs first):
  - [ ] `archivist_fetch`
  - [ ] `archivist_store`
  - [ ] `ops_qgate`
  - [ ] `ops_version`
  - [ ] `nomina_generate_name`
  - [ ] `prime_capsule`
  - [ ] (Cartographer actions added in Phase 2)
- [ ] Define standard response formats
- [ ] Determine required GitHub integration endpoints

---

## **8. Development Sandbox Setup**
- [ ] Populate Project with:
  - [ ] Early-mode drafts (DM, Creative, Ops, Cartographer)
  - [ ] Schema templates (JSON/YAML examples)
  - [ ] Naming seed samples for hybrid Nomina
  - [ ] Example canon entries (for testing Archivist)
- [ ] Run isolated tests of:
  - [ ] Name generation flows
  - [ ] Lore fetch/write cycles
  - [ ] Instruction adherence across mode switches

---

## **9. Prepare for Core Instruction Drafting**
- [ ] Resolve all open design questions
- [ ] Finalize Project file layout
- [ ] Validate Worker capabilities to support instruction references
- [ ] Confirm GitHub repository is ready for external data storage
- [ ] Confirm overall readiness to draft the **Worldforge Prime v1.0 Instruction Block**

---

## **10. Phase Completion Check**
- [ ] All Project environment decisions finalized
- [ ] GitHub prime structure created
- [ ] Worker evaluations completed
- [ ] Instruction architecture defined
- [ ] Action schema stubs prepared
- [ ] Testing sandbox functioning

Once all checkboxes in Phase 1 are complete, we proceed to **Phase 2: Prime Instruction Drafting**.


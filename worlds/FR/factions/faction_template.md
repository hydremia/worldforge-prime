# canon/worlds/FR/factions/_template.md — Faction Template (v1.0)

> This file is a reusable template for defining factions in the Prime Canon Layer.
> Copy this file, rename it (e.g. `harpers.md`), and fill it out for each faction.

---
## Frontmatter (Metadata)

```md
---
id: fr.faction.<slug>          # stable ID, e.g. fr.faction.harpers
world: FR                      # world key (FR, EB, HB_*, etc.)
scope: global | regional | local
region_focus:                  # optional, e.g. Sword Coast, Dalelands
alignment:                     # broad ethos, e.g. NG, LN, LE
visibility: covert | overt | mixed
primary_type:                  # e.g. spy_network, mercenary_company, knightly_order
status: active | fractured | dormant | destroyed
canon_tier: 1                  # always 1 for canon; 3 for improv promoted later
version: v1.0                  # increment when making meaningful changes
tags:
  - faction
  - <custom_tag1>
  - <custom_tag2>
---
```

---
## 1. Overview

**Full Name:**  
**Common Names/Aliases:**  

**One-Sentence Summary:**  
> A concise description of what this faction is and why it matters.

**Longer Summary (2–4 sentences):**  
Describe the faction's core identity, broad goals, and general public perception.

---
## 2. Origins & History (High-Level)

- **Founding circumstances:** When, where, and why was the faction created?
- **Key historical beats:** 3–6 bullet points marking major events.
- **Current state:** How stable is the faction in the 1494–1495 DR timeframe?

Keep this section focused on the most important milestones, not exhaustive chronology.

---
## 3. Ideology, Goals & Methods

### 3.1 Ideology
- Core beliefs or guiding principles.
- Moral/ethical stance and how it differs from rivals.

### 3.2 Goals
- Short-term objectives (what they’re pursuing right now).
- Long-term agenda (how they want to reshape the world).

### 3.3 Methods
- Typical tactics (overt force, espionage, diplomacy, blackmail, trade leverage, etc.).
- How ruthless, flexible, or constrained they are.

---
## 4. Structure & Organization

### 4.1 Leadership
- Key leaders or leadership bodies (titles, not necessarily full statblocks).
- How leadership succession and authority work.

### 4.2 Internal Structure
- Cells, circles, chapters, lodges, or legions.
- Any ranks or titles.

### 4.3 Membership
- Who joins, and why (social class, background, alignment tendencies).
- How diverse the membership is (species, cultures, regions).

---
## 5. Presence & Influence

### 5.1 Primary Regions of Operation
List by macro-region and key cities, for example:
- Sword Coast — Waterdeep, Neverwinter, Baldur’s Gate
- North — Silverymoon, Luskan

### 5.2 Public Perception
- How different regions/groups view the faction.
- Are they seen as heroes, villains, necessary evils, or something else?

### 5.3 Resources & Capabilities
- Notable assets (strongholds, safe houses, ships, magical items, artifacts).
- Unique capabilities (divination networks, mercenary armies, planar contacts).

---
## 6. Relationships with Other Factions

Use clear bullets, optionally with a qualitative label (ally, rival, hostile, wary, etc.).

- **Harpers:** e.g. wary ally / ideological counterpart.
- **Lords’ Alliance:** e.g. cooperative but politically constrained.
- **Zhentarim:** e.g. hostile competitor / shadow war.
- **Cult of the Dragon:** e.g. secret enemy / active opposition.

Note: this section should stay consistent with other factions’ files; if one is updated, check related entries.

---
## 7. Symbols, Colors & Iconography

- **Heraldry / symbol:** Describe sigils, icons, or recurring imagery.
- **Colors:** Primary/secondary faction colors.
- **Motto / phrases:** Any known slogans or sayings.

These details support visual prompts, NPC descriptions, and props.

---
## 8. Typical Agents & Tactics in Play

### 8.1 Typical Agents
- Common archetypes (spies, knights, merchants, priests, arcanists, etc.).
- Attitude and demeanor in the field.

### 8.2 Tactics in a Campaign
- How they interact with player characters (employers, patrons, enemies, rivals).
- The kind of missions, favors, or threats they bring.

---
## 9. Adventure Hooks (Tier-1 Examples)

Provide 3–7 reusable hooks:
- **Hook 1:** Short description.
- **Hook 2:** Short description.
- **Hook 3:** Short description.

These can be promoted as canonical hooks for the faction within your version of FR.

---
## 10. Canon Notes & Variants

- **Baseline Canon:** Brief statement of how this version relates to published FR lore (aligned, lightly diverged, heavily divergent).
- **Campaign Variants:** Known campaign-specific deviations and where they are stored (e.g., `canon/worlds/FR/campaigns/<Campaign>/factions/<Faction>.md`).
- **Promotion Status:** Whether this file is fully canonical, provisional, or still under review.

This section helps the Archivist Worker and Ops Mode track how “locked” this faction’s details are.


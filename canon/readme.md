# canon/README.md — Worldforge Prime Canon Layout (v1.0)

This README defines how canonical lore is organized in the `worldforge-prime` repository and how it is expected to be used by Worldforge Prime and the Archivist Worker.

---
## 1. Purpose of `/canon/`

The `/canon/` directory is the **single source of truth** for Tier 1 user/world canon:

- World-level reference material
- Campaign-specific lore
- NPCs, factions, locations, items, events
- Homebrew rules and setting changes

Prime **does not** store canon internally. All persistent, authoritative lore should either:

- live here as Markdown and/or structured data, or
- be represented in KV / Worker storage that conceptually mirrors this layout.

Archivist Worker is responsible for reading/writing canon aligned to this structure.

---
## 2. High-Level Structure

Recommended layout (subject to expansion as worlds and campaigns grow):

```text
canon/
├─ README.md
├─ worlds/
│  ├─ FR/                     # Forgotten Realms canonical layer
│  │  ├─ _index.md            # High-level summary of FR canon in this repo
│  │  ├─ geography/
│  │  │  ├─ overview.md
│  │  │  ├─ sword_coast.md
│  │  │  └─ other_regions.md
│  │  ├─ factions/
│  │  │  ├─ harpers.md
│  │  │  └─ zhentarim.md
│  │  ├─ pantheon/
│  │  │  ├─ core_deities.md
│  │  │  └─ regional_cults.md
│  │  ├─ timelines/
│  │  │  └─ 1490s_DR_overview.md
│  │  └─ campaigns/
│  │     └─ AccordOfForestAndFlame/
│  │        ├─ _index.md
│  │        ├─ npcs.md
│  │        ├─ locations.md
│  │        └─ events.md
│  └─ <OtherWorld>/            # Additional worlds as needed
│
└─ meta/
   ├─ canon_policies.md        # How canon is promoted/demoted
   └─ changelog.md             # High-level canon changes over time (optional)
```

Key ideas:

- **`worlds/`** groups lore by setting. FR is the default world but other settings (Eberron, homebrew worlds, etc.) should have parallel structures.
- **`campaigns/`** under each world holds campaign-specific canon that may diverge from base world canon.
- **`meta/`** holds process-level documents about canon itself (promotion rules, audit logs, etc.).

This structure is a guideline, not a cage: files can be split or merged as the project grows.

---
## 3. Relationship to the Lore Hierarchy

Worldforge Prime uses a strict three-tier hierarchy:

1. **Tier 1 — User / World Canon**
   - This directory (`/canon/`) and corresponding Worker-backed storage.
   - Always overrides everything else.

2. **Tier 2 — External Canon**
   - External references (e.g., FR sourcebooks, wikis) that are *not* stored here directly.
   - Used only when Tier 1 is silent.

3. **Tier 3 — Generated Improv**
   - Prime's on-the-fly creations.
   - May be promoted into Tier 1 by writing new files here (or via Archivist).

If there is ever a conflict between content in `/canon/` and external sources, `/canon/` wins.

---
## 4. File Conventions

- **Format:** Markdown (`.md`) for human-readable lore. Use JSON schemas in `/schemas/` for structured data; reference them from here as needed.
- **One concern per file:** Prefer splitting long, mixed documents into focused files (e.g., `factions/harpers.md` instead of a giant `factions.md`).
- **Stable IDs:**
  - When a piece of canon needs a stable identifier (for Workers, tooling, or cross-references), include it in frontmatter or a clearly-labeled section.
  - Example:
    ```md
    ---
    id: fr.faction.harpers
    tier: 1
    world: FR
    ---
    ```
- **Naming:**
  - Keep filenames lowercase, use hyphens or underscores.
  - Prefer descriptive names over abbreviations.

---
## 5. Campaign vs. Global Canon

Under each world, use `campaigns/` to isolate campaign-layer canon from global setting canon.

- **Global canon** (affects all campaigns in that world):
  - geography, major factions, pantheon, broad history
- **Campaign-specific canon:**
  - NPCs introduced in that campaign
  - localized political changes
  - specific dungeons, arcs, or alt-history branches

When a campaign decision diverges from global canon, you have options:

1. Record it ONLY under that campaign (branching timeline).
2. Explicitly update the global file and note it in `meta/changelog.md`.

Archivist and Prime should be aware of campaign context when deciding which version to use.

---
## 6. Archivist Worker Expectations

The Archivist Worker should treat `/canon/` as the human-readable mirror of its internal storage. At a high level, it should:

- Map `world_key` to `canon/worlds/<WorldKey>/`.
- Map `campaign_key` (when present) to `canon/worlds/<WorldKey>/campaigns/<CampaignKey>/`.
- Support reading/writing lore entries that correspond to:
  - NPCs
  - locations
  - items
  - factions
  - events
  - timelines

The exact storage mechanisms (KV, blobs, etc.) are implementation details, but they must preserve the same conceptual boundaries.

---
## 7. Promotion Flow (Improv → Canon)

When Prime generates new lore (Tier 3) that the user wants to keep:

1. User indicates they want it saved/promoted.
2. Prime calls `archivist_store` with appropriate `world_key`, `campaign_key`, and a payload that can be serialized into this structure.
3. Archivist persists it and, if applicable, reflects it back into `/canon/` as a new or updated file.

Promotion rules and manual editing guidelines can be further detailed in `meta/canon_policies.md`.

---
## 8. Multi-World / Multi-User Considerations

This layout is designed to support:

- Multiple worlds (e.g., FR, Eberron, Homebrew X).
- Multiple campaigns per world.
- Multiple users sharing or forking worlds/campaigns.

User-level separation (different Git branches, forks, or namespaces) should be handled by higher-level workflows (e.g., Git branching strategies, user-specific remotes, or separate repos). This `/canon/` directory defines the **in-world** structure, not the multi-user access model.

---
## 9. Next Steps

Immediate next steps for `/canon/`:

- Create `worlds/FR/_index.md` as an overview of the FR context you are using (timeline, focus regions, tone).
- Add initial stubs for:
  - `worlds/FR/geography/overview.md`
  - `worlds/FR/factions/harpers.md`
  - `worlds/FR/pantheon/core_deities.md`
- Define promotion guidelines in `meta/canon_policies.md` once the Archivist Worker contract solidifies.

This README should evolve as the canon library grows, but the core principles (Tier 1 authority, world/campaign separation) should remain stable.


# World Structure Model (WSM) Specification — Cartographer v1.0

## 1. Hierarchy

Canonical node chain for WSM:

- World
  - Continent
    - Region (geographic)
      - Realm (political)
        - Province / Territory
          - District (optional)
            - Settlement
              - Location

## 2. Node Types

- **World** — Top-level container (e.g., Toril, custom homebrew worlds).
- **Continent** — Major landmasses or primary divisions of a world.
- **Region** — Large geographic areas defined by geography/biome, not politics.
- **Realm** — Political or cultural sovereignty (kingdom, empire, city-state, republic, enclave, bastion-domain, etc.).
- **Province/Territory** — Administrative or practical subdivisions of a Realm (including protectorates and disputed lands).
- **District** — Optional local subdivision, often in or around major settlements.
- **Settlement** — Civic node: cities, towns, villages, hamlets, enclaves, outposts, etc.
- **Location** — Typed points of interest: ruins, bastions, shrines, towers, caverns, portals, anomalies, etc.

## 3. Core Fields

Each node records at least:

- `id` — Unique identifier string.
- `name` — Display name.
- `type` — One of `world | continent | region | realm | province | district | settlement | location`.
- `worldId` — ID of the world this node belongs to.
- `parentId` — Direct parent node ID (null for `world`).
- `childrenIds[]` — Optional list of direct children node IDs.

Environmental fields (stored inline or inherited):

- `environment` — Structured environment profile, including biome, climate, terrain, elevation, hazard, MSS, and tags.

Additional classification fields:

- `settlementType` — Only for `settlement` nodes (city, town, village, etc.).
- `locationType` — Only for `location` nodes (ruins, bastion, shrine, cavern, portal, etc.).
- `tags[]` — Arbitrary tags, such as `free_city`, `city_state`, `bastion`, `fey`, `shadow`, `border_town`, etc.

Timestamps and metadata:

- `createdAt` — ISO timestamp.
- `updatedAt` — ISO timestamp.
- `metadata` — Free-form JSON object for non-critical details.

## 4. Relationship Rules

- Each node (except World) must have exactly one `parentId`.
- Parent → child relationships must follow the hierarchy (no “illegal jumps”).
- Regions are geographic; they cannot encode political authority.
- Realms may span multiple Regions but have a primary Region association.
- Districts are optional; Settlements may live directly under Provinces/Territories.
- Locations may live under Settlements or higher-level nodes (isolated ruins, remote shrines, etc.).

## 5. Inheritance

Unless overridden, nodes inherit:

- biome
- climate
- terrain
- elevation
- hazard

Overrides can be triggered by:

- explicit per-node environment settings,
- tags (e.g., `underground`, `volcanic`, `shadow`, `planar`),
- location types that logically imply special environment profiles (e.g., caverns).

## 6. Integration with Lore

- Cartographer never overwrites Tier 1 canon.
- Archivist is always the final authority on WSM changes.
- External sources (maps, WA exports, user canon) flow into Cartographer and then into Archivist via WSM update proposals.

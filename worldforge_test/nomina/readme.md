# nomina/README.md — Hybrid Naming Engine Specification (v1.0)

This README defines how **Nomina**, the hybrid naming subsystem for Worldforge Prime, is structured and how it should be used by both Prime and the Nomina Worker.

Nomina ensures consistent, stylistically correct names across species, cultures, regions, and worlds while supporting procedural generation and user-driven canon.

---
## 1. Purpose of the Nomina System
Nomina provides:

- **Consistent naming style** within each culture/species/region
- **Collision avoidance** (checking against existing canon)
- **Procedural variety** using templates + seeds
- **User customization** and override support
- **Cross-world adaptability**
- **Promotion flow** for names generated in improv but later canonized

Prime should prefer Nomina-generated names for anything intended to be canon, recurring, or style-consistent.

---
## 2. Nomina Architectural Overview
Nomina is a **hybrid model**:

### 2.1 Template Layer (Style Rules)
Each species/culture/region has one or more **templates** describing:
- phonotactics (allowed sounds, forbidden clusters)
- syllable structures (e.g., CV, CVC, VCV)
- stylistic markers (apostrophes, double vowels, elvish lilt, dwarven hard stops)
- rarity distributions (common → rare) for variant patterns
- optional constraints (e.g., feminine/masculine/neutral suffix tendencies)

### 2.2 Seed Layer (Curated Examples)
JSONL lists of canonical examples and known names for context.
Used for:
- pattern analysis
- frequency shaping
- ensuring new names "fit"
- avoiding collision with canon or with recent generation history

### 2.3 Procedural Engine
The Worker generates names by:
1. Reading the template
2. Reading seed examples
3. Combining rules + procedural randomness
4. Filtering out collisions with canon (Tier 1)
5. Returning one or more unique names

The engine supports generating **1–50 names** per request.

---
## 3. Directory Structure
Nomina files should live under:

```text
nomina/
├─ README.md
├─ templates/                # structural rules for each culture/species
│  ├─ elf_high.json
│  ├─ elf_wood.json
│  ├─ dwarf_shield.json
│  └─ <other>.json
├─ seeds/                    # example name sets
│  ├─ elf_high.jsonl
│  ├─ elf_wood.jsonl
│  ├─ dwarf_shield.jsonl
│  └─ <other>.jsonl
└─ meta/
   ├─ schema_version.md
   └─ changelog.md
```

Worldforge Prime should **not** generate names using freeform language models when a Nomina dataset exists for the requested culture. If a dataset is missing, Prime can:
- create improv names (Tier 3), **but clearly label them**
- offer to add a new Nomina template
- or prompt the user for a style description

---
## 4. Worker Contract (Nomina Worker)
Prime interacts with the Nomina Worker using the `nomina_generate_name` action.

### 4.1 Request Payload
```json
{
  "world_key": "FR",
  "culture": "elf_high",
  "gender": "neutral",
  "style": "noble",
  "count": 5,
  "uniqueness_scope": "campaign"
}
```

### Required Fields:
- `world_key` — which world’s name canon to check against
- `culture` — naming culture (e.g., `elf_high`, `human_chondathan`)

### Optional Fields:
- `gender` — stylistic variant only (does not enforce human gender norms)
- `style` — `common`, `noble`, `ancient`, etc.
- `count` — how many names (1–50)
- `uniqueness_scope` — prevents collisions within the world or campaign

---
## 5. Collision Handling
Nomina automatically:
- checks generated names against Tier 1 canon
- checks against existing seeds
- checks against recent generations in the same session/capsule
- regenerates until it finds unique matches or hits safety limits

If collision resolution fails (extremely rare), the Worker should:
- return whatever names succeeded
- return an error flag for the colliding outputs

Prime must then:
- clearly state the issue
- offer alternative approaches (e.g., broaden culture, relax style constraints)

---
## 6. Promotion of Names into Canon
Any Nomina-generated name can be promoted to Tier 1 canon.

Promotion flow:
1. User confirms they want a generated name permanently added.
2. Prime calls `archivist_store` with payload:
   ```json
   {
     "payload": {
       "type": "name_entry",
       "culture": "elf_high",
       "name": "Vaerilion",
       "source": "Nomina",
       "notes": "Generated and accepted by user"
     }
   }
   ```
3. Archivist persists it.
4. Worker-side Nomina seeds update or KV records reflect permanence.

Names added this way affect future uniqueness checks.

---
## 7. Missing Templates & Fallback Behavior
If Prime receives a request for a naming culture without a template, it should:
1. Notify the user: "No Nomina template found for this culture."
2. Offer paths:
   - *Generate improv names (Tier 3)*
   - *Define a new naming style interactively*
   - *Create or import a new Nomina template*
3. If improv names are created:
   - Label them as non-canonical
   - Avoid claiming stylistic alignment

---
## 8. Template Structure (Guidelines)
Templates live in `/nomina/templates/` and follow a JSON schema defining:
- allowed consonants & vowels
- syllable patterns (CVC, CVV, VCV)
- prefix/suffix rules
- culture-specific quirks (e.g., hyphenation, apostrophes)
- rarity curves for complex patterns
- phonetic weights (e.g., high-elven lightness vs. dwarven hardness)

A future schema file (`nomina_template.schema.json`) will formalize validation.

---
## 9. Seeds Structure (Guidelines)
Seeds live in `/nomina/seeds/` and should be:
- JSONL files
- one name per line
- optionally annotated with tags or style markers

Example entry:
```json
{"name": "Aelar", "gender": "neutral", "style": "common"}
```

Seeds must reflect **Tier 1 canon** and **trusted external canon**, not improv.

---
## 10. Multi-World Support
Nomina supports multiple worlds via separate template+seed sets.

Example:
```
nomina/
└─ templates/
   ├─ FR_elf_high.json
   ├─ FR_human_chondathan.json
   ├─ EB_khorvaire_human.json
   └─ HB_dragonborn_vulnari.json
```

Prime handles world switching via the `world_key` in Worker calls. Naming styles must never bleed between worlds.

---
## 11. Immediate Next Steps
Recommended next files to draft:
- `nomina_template.schema.json` — formal template schema
- `seed_entry.schema.json` — structure for names stored in JSONL
- initial template files (e.g., `FR_elf_high.json`)

This README provides the conceptual framework for Nomina; implementation details for Workers and schemas will refine it further.


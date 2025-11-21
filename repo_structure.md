# worldforge-prime — Repo Structure (v1.0)

> Recommended top-level layout for the `worldforge-prime` repository.

```text
worldforge-prime/
├─ instructions/
│  ├─ prime_core_block_outline.md
│  ├─ prime_extended_instructions.md
│  ├─ prime_mode_templates.md
│  ├─ prime_conversation_starters.md
│  └─ (future) prime_core_block_final.md   # compressed <8k text for GPT
│
├─ roadmaps/
│  ├─ phase_1_normalized_roadmap.md
│  └─ (future) phase_2_cartographer_roadmap.md
│
├─ schemas/
│  ├─ prime_action_schema_stubs.json
│  ├─ (future) archivist_payload.schema.json
│  ├─ (future) nomina_template.schema.json
│  └─ (future) region_manifest.schema.json
│
├─ canon/
│  ├─ README.md                 # how canon is organized and promoted
│  └─ (future) worlds/FR/...    # FR-specific lore entries as .md
│
├─ regions/
│  └─ (future) fr_sword_coast_v1.json
│
├─ nomina/
│  ├─ README.md                 # hybrid model explanation
│  └─ (future) fr_elf_high_template.json
│
├─ legacy/
│  └─ v3.x/                     # any migrated or archived legacy artifacts
│
└─ MASTER_DOC.md                # exported Worldforge Prime master document
```


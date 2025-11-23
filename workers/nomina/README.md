# Worldforge Prime — Nomina Worker

Worker: `worldforge-prime-nomina`  
KV Binding: `NOMINA_KV` (namespace: `WF_PRIME_NOMINA_SETS`)  
Auth Secret: `NOMINA_TOKEN` (environment secret; required for all non-`/health` routes)

## Key Conventions

- `template:<species>:<culture>` — Nomina template files (JSON)
- `seeds:<species>:<culture>`    — Nomina seeds:
  - Preferred: JSONL (one seed per line)
  - Also supported: JSON array (as written by `/nomina/seed/add`)

Legacy / previous data may also use:

- `seeds:<cultureId>` where `cultureId` is already in `"species:culture"` form.  
  This is compatible with the current engine if callers follow the same pattern.

## HTTP Endpoints (v1.0)

- `GET /health`  
  - No auth required.  
  - Returns `{ ok: true, worker: "prime-nomina" }`.

- `POST /nomina/generate`  
  - Auth: `Authorization: Bearer <NOMINA_TOKEN>`  
  - Body:
    - `species` (string, required)
    - `culture` (string, required)
    - `gender` ("male" | "female" | "neutral", default `"neutral"`)
    - `count` (number, default `10`, capped at 100)
    - `rarityBias` ("common" | "uncommon" | "rare" | "mixed", default `"mixed"`)
    - `uniquenessScope` ("batch" | "culture", default `"batch"`)
  - Returns: `GenerateResult` with `names[]` and metadata.

- `GET /nomina/cultures`  
  - Auth: `Authorization: Bearer <NOMINA_TOKEN>`  
  - Returns list of cultures the worker knows about, along with:
    - `status`: `"ready" | "missing_template" | "missing_seeds"`
    - `seedCount`
    - `aliases`

- `POST /nomina/debug/culture`  
  - Auth: `Authorization: Bearer <NOMINA_TOKEN>`  
  - Body:
    - `species` (string, required)
    - `culture` (string, required)
    - `sampleSize` (number, optional, default `20`)
  - Returns:
    - Template version
    - Pattern sets IDs
    - Seed count + sample
    - Generated sample names

### Legacy Routes (Phase 1 compatibility)

- `POST /nomina/validate`  
  - Auth required.  
  - Body: `{ name, cultureId }`  
  - Currently always returns `{ valid: true }` and is kept only for compatibility.

- `POST /nomina/seed/add`  
  - Auth required.  
  - Body: `{ cultureId, seeds: string[] }`  
  - Stores JSON array under `seeds:<cultureId>` in `NOMINA_KV`.  
  - Recommended: use `cultureId = "<species>:<culture>"` to align with the new engine.

## Source Layout (Repo)

- `src/index.ts`           — CF Worker entrypoint (routing + auth + health)
- `src/nominaTypes.ts`     — Shared TS types/interfaces
- `src/nominaRegistry.ts`  — KV access + `Env` definition
- `src/nominaEngine.ts`    — Name generation logic
- `src/routes/generate.ts` — `/nomina/generate`
- `src/routes/cultures.ts` — `/nomina/cultures`
- `src/routes/debugCulture.ts` — `/nomina/debug/culture`

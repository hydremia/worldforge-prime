# Worldforge Prime — Nomina System Overview (v1.0)

**Subsystem:** Nomina (Name Engine)  
**Worker:** `worldforge-prime-nomina`  
**KV Namespace:** `WF_PRIME_NOMINA_SETS` (binding: `NOMINA_KV`)  
**Auth:** `NOMINA_TOKEN` (Worker secret, bearer token)  
**API Schema:** `schemas/prime_nomina_openapi_v1_0.json`

---

## 1. Purpose

Nomina is the central naming engine for Worldforge Prime. It provides:

- Species/culture-aware name generation
- Template-driven phonotactics and orthography
- Seed-based flavour anchoring
- Culture readiness status and debug tooling

The engine runs as a Cloudflare Worker and uses a KV-backed corpus of templates and seeds.

---

## 2. Runtime Topology

### 2.1 Cloudflare Worker

- Name: `worldforge-prime-nomina`
- Entrypoint: `workers/nomina/src/index.ts`
- Mode: ES Modules
- Auth:
  - `GET /health` is public
  - All other endpoints require `Authorization: Bearer <NOMINA_TOKEN>`

### 2.2 KV Namespace

- Title: `WF_PRIME_NOMINA_SETS`
- Binding: `NOMINA_KV`
- Key patterns:
  - `template:<species>:<culture>`
  - `seeds:<species>:<culture>`

Example keys:

- `template:elf:high_elf`
- `seeds:elf:high_elf`

---

## 3. Data Layout

### 3.1 Templates

Repo location:

- `nomina/templates/<species>/<culture>.json`

Stored in KV as:

- Key: `template:<species>:<culture>`
- Value: full JSON content

Core fields (simplified):

- `version`: template version string, e.g. `"1.0.0"`
- `species`: e.g. `"elf"`
- `culture`: e.g. `"high_elf"`
- `aliases`: alternative labels
- `templates`: pattern strings per category (`male`, `female`, `neutral`, `family`)
- `patternSets`: weighted syllable sets used by Nomina engine
- `orthography`: case handling and allowed/forbidden clusters
- `rarity`: relative weights (`common`, `uncommon`, `rare`)
- `collision`: future tuning for uniqueness enforcement
- `isolation`: reserved for isolated/rare populations
- `qa`: quality state (`draft`, `qa_passed`, etc.)

The engine only depends on a subset but the shape is forward-compatible.

### 3.2 Seeds

Repo location:

- `nomina/seeds/<species>/<culture>.jsonl`

Stored in KV as:

- Key: `seeds:<species>:<culture>`
- Value: JSONL text (one seed name per line) or JSON array (legacy)

The worker’s seed loader:

- Attempts to parse value as JSON array first
- Falls back to splitting by newline if parsing fails

Seeds are used for:

- QA and sampling
- Future similarity/collision logic
- Tuning culture flavour

---

## 4. API Surface (Nomina v1.0)

Base URL: `https://worldforge-prime-nomina.hydremia.workers.dev`  
Full schema: `schemas/prime_nomina_openapi_v1_0.json`

### 4.1 `GET /health`

- **Auth:** None
- **Use:** Liveness probe
- **Response:**

```json
{
  "ok": true,
  "worker": "prime-nomina"
}
```

---

### 4.2 `POST /nomina/generate`

Generates names for a given species, culture, and gender.

- **Auth:** `Authorization: Bearer <NOMINA_TOKEN>`
- **Body:**

```json
{
  "species": "elf",
  "culture": "high_elf",
  "gender": "female",
  "count": 10,
  "rarityBias": "mixed",
  "uniquenessScope": "batch"
}
```

- `species`: template segment (e.g. `"elf"`)
- `culture`: template segment (e.g. `"high_elf"`)
- `gender`: `"male" | "female" | "neutral"` (default `"neutral"`)
- `count`: 1–100 (default 10)
- `rarityBias`: `"common" | "uncommon" | "rare" | "mixed"` (default `"mixed"`)
- `uniquenessScope`: `"batch" | "culture"` (currently used as `"batch"`)

**Success (200):**

```json
{
  "species": "elf",
  "culture": "high_elf",
  "gender": "female",
  "count": 3,
  "names": ["Alathas", "Alathir", "Drielos"],
  "rarityBias": "mixed",
  "uniquenessScope": "batch"
}
```

**Typical failure (500, missing template):**

```json
{
  "error": "Nomina generation failed",
  "detail": "No Nomina template found for elf:high_elf"
}
```

---

### 4.3 `GET /nomina/cultures`

Returns readiness status for all known cultures.

- **Auth:** `Authorization: Bearer <NOMINA_TOKEN>`
- **Response:**

```json
{
  "cultures": [
    {
      "species": "elf",
      "culture": "high_elf",
      "aliases": ["Sun Elf"],
      "status": "ready",
      "seedCount": 142
    },
    {
      "species": "elf",
      "culture": "wood_elf",
      "aliases": [],
      "status": "missing_seeds",
      "seedCount": 0
    }
  ]
}
```

`status` values:

- `"ready"`: template + seeds present
- `"missing_template"`: template missing in KV
- `"missing_seeds"`: template exists but seeds empty

---

### 4.4 `POST /nomina/debug/culture`

Debug view for a single culture; useful for QA and tuning.

- **Auth:** `Authorization: Bearer <NOMINA_TOKEN>`
- **Body:**

```json
{
  "species": "elf",
  "culture": "high_elf",
  "sampleSize": 20
}
```

- **Success (200):**

```json
{
  "species": "elf",
  "culture": "high_elf",
  "templateVersion": "1.0.0",
  "patternSets": ["default"],
  "seedCount": 142,
  "seedSample": ["Alathas", "Beluar", "Caelir"],
  "generatedSample": ["Alathas", "Alathir", "Drielos"]
}
```

---

### 4.5 Legacy endpoints

Kept for compatibility with earlier experiments.

#### `POST /nomina/validate` (deprecated)

- Returns `valid=true` for all inputs.
- Accepts `{ "name": "...", "cultureId": "elf:high_elf" }`.
- Currently a stub; may gain real validation logic later.

#### `POST /nomina/seed/add` (deprecated)

- Accepts `{ "cultureId": "elf:high_elf", "seeds": ["A", "B", "C"] }`.
- Stores JSON array into `seeds:<cultureId>`.
- v1.0 prefers bulk KV install via Wrangler.

---

## 5. Implementation Notes

### 5.1 Code layout

Under `workers/nomina/src/`:

- `index.ts`
  - Entry point and router
  - Handles `/health`
  - Applies bearer auth
  - Routes to generate/cultures/debug handlers
  - Retains legacy `/nomina/validate` and `/nomina/seed/add` behavior

- `nominaTypes.ts`
  - Type definitions: templates, requests, responses

- `nominaRegistry.ts`
  - `Env` definition (`NOMINA_KV`, `NOMINA_TOKEN`)
  - KV helpers: `loadTemplate`, `loadSeeds`

- `nominaEngine.ts`
  - Combines templates + pattern sets + RNG to generate names
  - Applies orthography rules and basic uniqueness per batch

- `routes/generate.ts`
  - `/nomina/generate` handler

- `routes/cultures.ts`
  - `/nomina/cultures` handler

- `routes/debugCulture.ts`
  - `/nomina/debug/culture` handler

### 5.2 Deployment

Recommended deploy path:

```bash
wrangler deploy --name worldforge-prime-nomina workers/nomina/src/index.ts
```

KV bulk upload (remote):

```powershell
$namespaceId = "<WF_PRIME_NOMINA_SETS_ID>"

# Templates
Get-ChildItem ".
omina	emplates" -Recurse -File -Include *.json | ForEach-Object {
  $file    = $_
  $species = $file.Directory.Name
  $culture = $file.BaseName
  $key     = "template:$($species):$($culture)"

  wrangler kv key put --remote --namespace-id $namespaceId $key --path $file.FullName
}

# Seeds
Get-ChildItem ".
omina\seeds" -Recurse -File -Include *.jsonl | ForEach-Object {
  $file    = $_
  $species = $file.Directory.Name
  $culture = $file.BaseName
  $key     = "seeds:$($species):$($culture)"

  wrangler kv key put --remote --namespace-id $namespaceId $key --path $file.FullName
}
```

---

## 6. Versioning

- Nomina API: **v1.0.0**
- Schema file: `schemas/prime_nomina_openapi_v1_0.json`
- This doc: `docs/nomina_system_overview_v1_0.md`

Breaking changes to endpoints, request/response shapes, or KV key patterns should bump the Nomina major/minor version and be reflected in both files.

---

## 7. Integration Expectations

- **Prime GPT:**
  - Uses OpenAPI schema as an action
  - Calls `/nomina/generate` for name generation tasks
  - Calls `/nomina/cultures` for culture UX

- **OPS GPT:**
  - Uses `/health`, `/nomina/cultures`, and `/nomina/debug/culture` for monitoring and QA
  - Verifies KV corpus is in sync with `nomina/templates` and `nomina/seeds` in the repo

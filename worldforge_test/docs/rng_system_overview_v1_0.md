# Worldforge Prime — RNG Worker v1.0

## 1. Purpose

The RNG Worker provides a centralized, cryptographically secure dice oracle for the Worldforge Prime ecosystem. All official dice rolls should be performed through this worker to guarantee uniformity, independence, and auditability.

## 2. Architecture

- Cloudflare Worker (modules): `worldforge-prime-rng`
- Auth: Bearer token in `Authorization` header (`RNG_TOKEN`)
- Optional KV namespace: `RNG_LOG_KV` for logging roll results
- Integration: Prime GPT via OpenAPI schema `prime_rng_openapi_v1_0.json`

## 3. Endpoints

### `GET /health`

Basic health check.

### `POST /roll`

Perform a single dice roll specification.

**Body (SingleRollSpec):**

- `sides` (integer, required) — die size, e.g. 20 for d20
- `count` (integer, optional, default 1) — number of dice to roll (1–1000)
- `label` (string, optional) — label for the roll, e.g. "attack_roll"
- `meta` (object, optional) — arbitrary metadata, e.g. `{ "campaign": "Accord_Forest_Flame", "actor": "Dramatis" }`

**Response (RollResult):**

- `sides` — die size
- `rolls` — array of individual results
- `total` — sum of all rolls
- `label` — label echoed back
- `meta` — metadata echoed back
- `rollId` — UUID assigned by the worker
- `timestamp` — ISO timestamp of the roll

If `RNG_LOG_KV` is bound, each `/roll` result is logged as `single:<timestamp>:<rollId>`.

### `POST /batch`

Perform multiple roll specifications in a single request.

**Body (BatchRollRequest):**

- `rolls` — array of `SingleRollSpec` objects (1–100 items)

**Response:**

```json
{
  "results": [ RollResult, ... ]
}
```

If `RNG_LOG_KV` is bound, each batch result array is logged as `batch:<timestamp>:<uuid>`.

## 4. RNG Implementation

- Uses Web Crypto `crypto.getRandomValues()` to generate 32-bit random integers.
- Applies rejection sampling to avoid modulo bias when mapping to `1..sides`.
- Supports up to 1000 dice per roll and up to 100 roll specs per batch.

This is sufficient to provide statistically fair dice for tabletop gameplay and exceeds the quality of typical physical dice.

## 5. Example Usage

### Single d20 roll

`POST /roll` body:

```json
{
  "sides": 20,
  "label": "attack_roll",
  "meta": { "campaign": "Accord_Forest_Flame", "actor": "Dramatis" }
}
```

### 4d6 (attribute) roll

```json
{
  "sides": 6,
  "count": 4,
  "label": "str_gen",
  "meta": { "method": "4d6_drop_lowest" }
}
```

(Note: drop-lowest logic can be applied by the caller using the raw `rolls` array.)

### Batch example

```json
{
  "rolls": [
    { "sides": 20, "label": "attack" },
    { "sides": 8, "count": 2, "label": "damage" }
  ]
}
```

## 6. Wrangler Configuration (example)

```jsonc
{
  "name": "worldforge-prime-rng",
  "main": "workers/rng/src/index.ts",
  "compatibility_date": "2025-11-23",
  "kv_namespaces": [
    {
      "binding": "RNG_LOG_KV",
      "id": "<your_rng_log_kv_namespace_id>"
    }
  ]
}
```

## 7. Smoke Test Flow

1. `GET /health` → expect `{ "ok": true, "service": "rng" }`
2. `POST /roll` with `{"sides":20}` → expect single d20 result
3. `POST /batch` with multiple specs → expect array of results

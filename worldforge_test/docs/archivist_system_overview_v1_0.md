# Worldforge Prime — Archivist Worker v1.0

## 1. Purpose

The Archivist Worker is the canon engine for Worldforge Prime. It is responsible for:

- Canon ingestion (accepting entities from GPTs, imports, and tools)
- Canon storage and retrieval via Cloudflare KV
- Conflict detection between existing and incoming entities
- Conflict resolution and lineage tracking
- Providing a stable API surface for OPS/QGate and runtime tools

## 2. Architecture

- Cloudflare Worker (modules): `worldforge-prime-archivist`
- KV namespace: `ARCHIVIST_KV`
- Auth: Bearer token in `Authorization` header (`ARCHIVIST_TOKEN`)
- Integration: Prime GPT via OpenAPI schema `prime_archivist_openapi_v1_0.json`

## 3. KV Layout

- `canon:<entityType>:<id>` → `CanonEntity`
- `conflicts:<conflictId>` → `ConflictRecord`
- `review_queue:<reviewId>` → (optional, future use)

## 4. Routes

- `GET /health` — health check
- `POST /review` — submit a `CanonEntity` for conflict checking
- `POST /store` — directly store a `CanonEntity` into KV
- `GET /entity/get` — fetch by `id` and `type`
- `POST /entity/search` — search by type, tag, and free text
- `POST /resolve` — resolve a conflict and update canon

## 5. OPS & QGate

OPS uses the Archivist API to:

- Submit proposed canon changes via `/review`
- Inspect conflicts via KV (`conflicts:*`)
- Resolve conflicts explicitly via `/resolve`
- Verify that canon entities exist and are retrievable

## 6. Smoke Test Flow

1. `GET /health` → expect `{ ok: true, service: "archivist" }`
2. `POST /store` → store a dummy entity
3. `GET /entity/get` → retrieve the dummy entity
4. `POST /review` → submit an entity with same id and intentional differences to trigger a conflict
5. `POST /resolve` → resolve the created conflict

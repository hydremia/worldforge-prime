# Cartographer API Reference — v1.0 (Conceptual)

This document summarizes the primary Cartographer endpoints. Exact details are defined in `openapi/cartographer_v1.yaml`.

## 1. Health

- `GET /cartographer/health`  
  Returns a simple `{ ok: true }` payload for status checks.

## 2. Map Ingestion Sessions

- `POST /cartographer/map/session/start`  
  Start a new map ingestion session.

- `POST /cartographer/map/session/{sessionId}/features`  
  Submit or update map features for a session.

- `POST /cartographer/map/session/{sessionId}/answers`  
  Submit clarification answers for outstanding questions.

- `GET /cartographer/map/session/{sessionId}/proposal`  
  Retrieve the current WSM proposal for review.

- `POST /cartographer/map/session/{sessionId}/confirm`  
  Confirm/adjust the proposal and optionally mark ready for Archivist.

- `GET /cartographer/map/session/{sessionId}`  
  Get overall session status and progress.

## 3. Spatial Queries

- `GET /cartographer/node/{nodeId}/environment`  
  Fetch environment data for a node.

- `GET /cartographer/node/{nodeId}/describe`  
  Human-readable summary of a node and its hierarchy context.

- `GET /cartographer/node/{nodeId}/adjacent`  
  List adjacent Regions/Realms/Provinces.

- `POST /cartographer/route/trace`  
  Propose a route between two nodes with difficulty and hazard annotations.

- `GET /cartographer/node/{nodeId}/nearest-settlement`  
  Find the nearest settlement matching filters.

## 4. Worldgen / Creative

- `POST /cartographer/propose/settlement`  
  Propose one or more settlements in a Region.

- `POST /cartographer/propose/location`  
  Propose one or more Locations (POIs) in a Region.

- `POST /cartographer/propose/regions`  
  Suggest Regions for underdeveloped world areas.

- `POST /cartographer/terrain/variations`  
  Suggest micro-variations in terrain for flavor and encounter design.

## 5. Validation (OPS)

- `POST /cartographer/validate/node`  
  Validate a node’s structure and environment coherence.

- `POST /cartographer/validate/boundaries`  
  Validate region/realm/province boundaries for overlaps or impossible geometry.

- `POST /cartographer/validate/terrain`  
  Check biome/terrain/elevation/climate relationships across a node set.

## 6. Canon & Summaries (Archivist)

- `POST /cartographer/wsm/propose`  
  Submit WSM update proposals to Archivist for review.

- `GET /cartographer/world/{worldId}/tree`  
  Retrieve the full WSM tree for a world.

- `GET /cartographer/realm/{realmId}/summary`  
  Get a structured summary of a Realm and its environment.

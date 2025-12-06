# Map Ingestion Guide — Cartographer v1.0

## 1. Purpose

Map ingestion is the process of turning a described or uploaded map into structured WSM data via a **guided, interactive workflow**. Cartographer does not read pixels directly; it relies on GPT + user interpretation to describe features, then validates and transforms them.

## 2. Accepted Inputs

Cartographer supports:

- Raw digital maps (PNG/JPEG/WebP, scanned images) interpreted via GPT + user.
- Hybrid image + description inputs (map plus clarifying notes).
- WA maps with exported boundaries, markers, or coordinates.
- Partial regional maps (zoomed-in sectors).
- Narrative-only descriptions of geography.

## 3. Workflow Overview

1. **Session Start**  
   - `POST /cartographer/map/session/start`  
   - Creates a Map Ingestion Session with a `sessionId`.

2. **Feature Submission**  
   - GPT/user submit detected `MapFeature` objects describing landmasses, rivers, mountains, settlements, etc.
   - Cartographer stores them in the session and analyzes them.

3. **Clarification Phase**  
   - Cartographer generates `ClarificationQuestion` entries for ambiguous items:
     - “Is this line a border, a road, or decoration?”
     - “Is this purple forest magical or stylistic?”

4. **Answer Submission**  
   - GPT/user send `ClarificationAnswer` objects that resolve questions.
   - Cartographer updates internal feature representations.

5. **Metadata Construction**  
   - Cartographer infers scale, boundaries, biomes, climates, terrain, elevation, hazard, MSS, and adjacency.

6. **WSM Proposal Generation**  
   - Cartographer builds a non-canonical `WSMUpdateProposal` representing the inferred hierarchy and environment.

7. **User Confirmation Loop**  
   - User reviews and adjusts proposed Regions, Realms, Settlements, Locations, and magical zones.
   - Once satisfied, they mark the proposal ready for Archivist.

8. **Archivist Canonization**  
   - Cartographer sends the proposal to Archivist.
   - Archivist either canonizes or requests further adjustments.
   - Once accepted, WSM and indices are updated.

## 4. Session States

Key ingestion session statuses:

- `pending_features`
- `needs_clarification`
- `building_proposal`
- `proposal_ready`
- `pending_archivist`
- `complete`
- `aborted`

## 5. What Comes Out

After canonization, Cartographer exposes:

- WSM nodes for the ingested area.
- Environment profiles for each node.
- Adjacency data for regions/realms.
- Map metadata (scale, orientation, etc.).

DM and Creative modes can then query this data as if the map had always been part of the world.

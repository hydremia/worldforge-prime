#!/usr/bin/env bash
set -euo pipefail

if [ -z "${ARCHIVIST_KV_ID:-}" ]; then
  echo "Usage: ARCHIVIST_KV_ID=<your_kv_id> $0"
  exit 1
fi

echo "Seeding demo entity into ARCHIVIST_KV (${ARCHIVIST_KV_ID})..."

wrangler kv key put \
  --remote \
  --namespace-id "$ARCHIVIST_KV_ID" \
  "canon:npc:demo_npc_001" \
  --path kv/archivist_demo_entity.json

echo "Done."

param(
  [Parameter(Mandatory = $true)]
  [string] $ArchvistKvId
)

Write-Host "Seeding demo entity into ARCHIVIST_KV ($ArchvistKvId)..."

wrangler kv key put `
  --remote `
  --namespace-id $ArchvistKvId `
  "canon:npc:demo_npc_001" `
  --path kv/archivist_demo_entity.json

Write-Host "Done."

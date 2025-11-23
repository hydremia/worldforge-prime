param(
  [Parameter(Mandatory = $true)]
  [string] $Token,
  [Parameter(Mandatory = $false)]
  [string] $BaseUrl = "https://worldforge-prime-rng.hydremia.workers.dev"
)

Write-Host "=== RNG /health ==="
$health = Invoke-WebRequest -Uri "$BaseUrl/health" -Method GET
$health.Content

Write-Host "`n=== RNG /roll (d20) ==="
$bodySingle = '{"sides":20,"label":"test_attack","meta":{"campaign":"Test","actor":"TestActor"}}'
$single = Invoke-WebRequest -Uri "$BaseUrl/roll" `
                            -Headers @{ Authorization = "Bearer $Token" } `
                            -Method POST `
                            -Body $bodySingle `
                            -ContentType "application/json"
$single.Content

Write-Host "`n=== RNG /batch ==="
$bodyBatch = '{
  "rolls": [
    { "sides": 20, "label": "attack" },
    { "sides": 8, "count": 2, "label": "damage" }
  ]
}'
$batch = Invoke-WebRequest -Uri "$BaseUrl/batch" `
                           -Headers @{ Authorization = "Bearer $Token" } `
                           -Method POST `
                           -Body $bodyBatch `
                           -ContentType "application/json"
$batch.Content

Write-Host "`n=== DONE ==="

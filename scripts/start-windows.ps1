$ErrorActionPreference = "Stop"

docker compose up --build -d

Write-Host "PM MVP is starting at http://localhost:8000"

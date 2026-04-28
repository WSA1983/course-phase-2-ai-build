#!/usr/bin/env bash
set -euo pipefail

docker compose up --build -d

echo "PM MVP is starting at http://localhost:8000"

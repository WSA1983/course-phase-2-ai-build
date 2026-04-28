# Scripts

This directory contains startup and shutdown scripts for local Docker-based development.

## Current scripts

- macOS:
  - `start-mac.sh`
  - `stop-mac.sh`
- Linux:
  - `start-linux.sh`
  - `stop-linux.sh`
- Windows (PowerShell):
  - `start-windows.ps1`
  - `stop-windows.ps1`

## Behavior

- Start scripts run `docker compose up --build -d`.
- Stop scripts run `docker compose down`.
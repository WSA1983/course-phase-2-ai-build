# Backend

This directory contains the FastAPI backend service for the PM MVP.

## Current responsibilities (through Phase 5)

- Expose a root HTML route (`/`) for scaffold verification.
- Expose basic API routes:
  - `GET /api/health`
  - `GET /api/hello`
- Provide backend unit tests.
- Run with `uv` and `uvicorn`.
- Define SQLite schema for `users` and `boards`.
- Serialize and validate board JSON payloads.
- Initialize database file and seed MVP demo user/board defaults.

## Notes

- Frontend static build serving at `/` is now active.
- API-backed Kanban read/write routes are implemented in later phases.
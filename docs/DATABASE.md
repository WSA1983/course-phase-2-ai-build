# Database design (Phase 5)

## Goals

- Persist one Kanban board per user for MVP.
- Keep schema compatible with future multi-user growth.
- Store full board shape as JSON to keep frontend/backend models aligned.

## Engine and location

- Engine: SQLite
- Default DB file target for local runs: `backend/data/pm.sqlite3` (path can be configured in Phase 6)

## Tables

### `users`

- `id` INTEGER PRIMARY KEY AUTOINCREMENT
- `username` TEXT NOT NULL UNIQUE
- `password_hash` TEXT NOT NULL
- `created_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
- `updated_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP

### `boards`

- `id` INTEGER PRIMARY KEY AUTOINCREMENT
- `user_id` INTEGER NOT NULL UNIQUE
- `board_json` TEXT NOT NULL
- `created_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
- `updated_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
- FK: `user_id` -> `users.id` ON DELETE CASCADE

## JSON shape stored in `boards.board_json`

The payload stores the current board structure:

```json
{
  "columns": [
    {
      "id": "col-backlog",
      "title": "Backlog",
      "cardIds": ["card-1", "card-2"]
    }
  ],
  "cards": {
    "card-1": {
      "id": "card-1",
      "title": "Example title",
      "details": "Example details"
    }
  }
}
```

## Serialization and validation approach

- Store board payload as normalized JSON text (`json.dumps` with stable key ordering).
- Validate at load time that payload is an object with:
  - `columns` as a list
  - `cards` as an object/map
- Reject malformed payloads before use.

## Seeding strategy for MVP

During DB initialization:

- Create tables from `backend/app/schema.sql` if missing.
- Seed demo user (`user` / `password`) if missing.
- Seed one default board row for that user if missing.

## Migration plan

- Keep `schema.sql` as source of truth for MVP.
- Introduce explicit migration files once schema starts evolving across environments.
- Move from plain `password_hash` placeholder to real password hashing when auth hardening begins.

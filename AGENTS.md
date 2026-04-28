# The Project Management MVP web app

## Purpose

This project builds a local-first Project Management MVP with a Kanban board and an AI chat sidebar that can update board state.

## Product Requirements

- User can sign in with MVP credentials.
- Signed-in user sees one Kanban board for their project.
- Board columns are fixed in count but each column name is editable.
- Cards can be edited and moved via drag-and-drop.
- Sidebar AI chat can create, edit, and move one or more cards using structured backend-driven updates.

## MVP Scope and Constraints

- Use hardcoded credentials (`user` / `password`) for MVP sign-in.
- Data model must support multiple users for future expansion.
- One board per signed-in user in MVP.
- App must run locally in Docker.
- Non-goals for MVP: external auth providers, multi-board UX, collaboration features, and cloud deployment workflows.

## Technical Decisions

- `frontend/`: Next.js app.
- `backend/`: Python FastAPI app that serves API routes and the built frontend at `/`.
- Docker packages frontend and backend into one runnable local container.
- Use `uv` for Python dependency management in Docker and local backend workflows.
- Use OpenRouter for AI calls and load `OPENROUTER_API_KEY` from environment variables only (never hardcode secrets).
- AI model: `openai/gpt-oss-120b`.
- Database: local SQLite file, created automatically if missing.
- Cross-platform start/stop scripts live in `scripts/`.

## Starting Point

`frontend/` already contains a working frontend-only Kanban demo. It is not yet integrated into Docker + backend.

## Color Scheme

- Accent Yellow: `#ecad0a` (accents and highlights)
- Blue Primary: `#209dd7` (links and key sections)
- Purple Secondary: `#753991` (submit buttons and important actions)
- Dark Navy: `#032147` (main headings)
- Gray Text: `#888888` (supporting text and labels)

## Engineering Rules

1. Use current stable libraries and idiomatic patterns.
2. Keep implementation simple and scoped; do not add extra features.
3. Be concise in docs and comments; avoid unnecessary verbosity.
4. No emojis in project docs or code comments.
5. When debugging, prove the root cause with evidence before applying a fix.
6. Every behavioral change must include tests.

## Testing Standard

- Minimum 80% unit test coverage for both frontend and backend packages as they are introduced.
- Add robust integration tests for critical user flows and API interactions.

## Definition of Done (MVP)

- Login flow works with hardcoded credentials.
- Kanban loads, supports card movement/editing, and persists state.
- Backend API owns persistence and board mutation logic.
- AI chat can return structured responses and apply valid board updates.
- Full app runs locally via Docker using documented start/stop scripts.

## Working Documentation

- Planning and execution documents live in `docs/`.
- Always review `docs/PLAN.md` before implementation work.
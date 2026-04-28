# Project Plan

This plan defines implementation order, required outputs, tests, and release gates for the MVP in `AGENTS.md`.

## Global Rules

- Complete phases in order; do not skip gates.
- Keep implementation simple and avoid out-of-scope features.
- Maintain at least 80% unit test coverage in the code introduced so far.
- Add robust integration tests for each end-to-end behavior introduced in a phase.
- Ask for user approval at each sign-off checkpoint before continuing.

## Cross-Cutting Test Strategy

### Unit tests

- Frontend: component and utility tests (Vitest + Testing Library).
- Backend: service, schema, and route logic tests (pytest).
- Coverage target: minimum 80% for each package once created.

### Integration tests

- Frontend integration: key user interactions and API boundary behavior.
- Backend integration: API route behavior with realistic DB interactions.
- End-to-end smoke flow as stack matures:
  - Sign in
  - View board
  - Move/edit card
  - Persist and reload
  - AI update appears on board

## AI Output Contract (for phases 8-10)

- Backend defines strict structured output schema.
- AI can mutate only allowed board fields (column title, card title, card details, card position, card create/delete/move where permitted by schema).
- Reject malformed or out-of-contract AI payloads and return a safe user-facing message.
- Persist only validated mutations.

## Phase 1 - Planning and Documentation

**Goal:** Establish clear project constraints, implementation sequence, and ownership docs.

**Deliverables**

- [x] Update root `AGENTS.md` with clarified MVP constraints and engineering standards.
- [x] Rewrite `docs/PLAN.md` into a detailed checklist plan with tests and success criteria.
- [x] Create `frontend/AGENTS.md` documenting the current frontend implementation.

**Tests**

- [x] Documentation review pass for internal consistency and scope alignment.

**Success criteria**

- [x] User approves the revised plan and project guidance docs.

**Sign-off checkpoint**

- [x] Required before starting Phase 2.

## Phase 2 - Scaffolding

**Goal:** Create a runnable full-stack skeleton with Docker, backend app, and script entry points.

**Deliverables**

- [x] Add Docker infrastructure for local one-command startup.
- [x] Scaffold `backend/` FastAPI app with health route and placeholder API route.
- [x] Add start/stop scripts for macOS, Linux, and Windows in `scripts/`.
- [x] Serve temporary static hello-world content from backend root route.

**Tests**

- [x] Backend unit tests for app startup and sample route behavior.
- [x] Integration smoke test proving container boots and serves both page and API route.
- [x] Validate unit coverage stays >= 80% for backend package.

**Success criteria**

- [x] `docker` workflow starts successfully and serves HTML + API response locally.
- [x] Scripts in `scripts/` consistently start and stop the stack.

## Phase 3 - Frontend Served by Backend

**Goal:** Build and serve the existing Next.js frontend at `/` through backend/Docker workflow.

**Deliverables**

- [x] Build frontend as static assets in container workflow.
- [x] Configure backend to serve built frontend at `/`.
- [x] Confirm Kanban demo renders exactly as expected from integrated stack.

**Tests**

- [x] Frontend unit tests for critical components/utilities.
- [x] Integration test verifying `/` returns frontend and Kanban renders in browser.
- [x] Ensure frontend unit coverage >= 80%.

**Success criteria**

- [x] Running container shows current Kanban demo at `/` with no backend data dependency yet.

## Phase 4 - MVP Sign-In Experience

**Goal:** Gate board access behind dummy login and support logout.

**Deliverables**

- [x] Add login screen at initial load.
- [x] Validate hardcoded credentials (`user` / `password`).
- [x] Persist session state for active local session.
- [x] Add logout path returning user to login screen.

**Tests**

- [x] Unit tests for auth form validation and session utility logic.
- [x] Integration tests for login success, login failure, and logout behavior.
- [x] Maintain >= 80% unit coverage for frontend.

**Success criteria**

- [x] Unauthenticated users cannot access board screen.
- [x] Authenticated users can log in/out reliably in local environment.

## Phase 5 - Database Modeling

**Goal:** Define and document persistent data model for users and board state.

**Deliverables**

- [x] Propose SQLite schema for users + single board per user in MVP.
- [x] Store board payload as JSON with documented shape and constraints.
- [x] Add docs describing schema decisions, migrations, and future extensibility.

**Tests**

- [x] Unit tests for schema validation and serialization/deserialization helpers.
- [x] Integration test for database initialization when file does not exist.
- [x] Maintain >= 80% unit coverage for backend.

**Success criteria**

- [ ] User signs off on schema and storage approach before API implementation.

**Sign-off checkpoint**

- [ ] Required before starting Phase 6.

## Phase 6 - Backend Kanban API

**Goal:** Implement API routes for reading and mutating board data per user.

**Deliverables**

- [ ] Add authenticated routes for board fetch and board update operations.
- [ ] Ensure DB file is auto-created and initialized when absent.
- [ ] Implement board mutation safeguards at API/service layer.

**Tests**

- [ ] Unit tests for board service mutation logic and validation.
- [ ] Integration tests for API success/error paths and persistence checks.
- [ ] Maintain >= 80% unit coverage for backend.

**Success criteria**

- [ ] API can fully read/update board state for signed-in user and persist data.

## Phase 7 - Frontend/Backend Integration

**Goal:** Move frontend board state management from local demo data to backend API persistence.

**Deliverables**

- [ ] Replace in-memory board source with API-backed fetch/update flows.
- [ ] Handle loading, error, and optimistic update states simply and clearly.
- [ ] Keep drag-drop and edit UX behavior aligned with existing experience.

**Tests**

- [ ] Frontend unit tests for API client and state transition helpers.
- [ ] Integration tests for board load, move/edit, and persistence after refresh.
- [ ] Maintain >= 80% frontend unit coverage.

**Success criteria**

- [ ] Board interactions persist through backend and survive browser reload.

## Phase 8 - AI Connectivity Baseline

**Goal:** Add backend connectivity to OpenRouter and verify model invocation.

**Deliverables**

- [ ] Add OpenRouter client in backend using env-driven `OPENROUTER_API_KEY`.
- [ ] Implement simple connectivity endpoint or internal service check.
- [ ] Confirm model call using a deterministic prompt (for example, `2+2`).

**Tests**

- [ ] Unit tests with mocked OpenRouter client behavior.
- [ ] Integration test for connectivity endpoint with network call mocked in CI.
- [ ] Maintain >= 80% backend unit coverage.

**Success criteria**

- [ ] Backend can successfully invoke OpenRouter model in local environment.

## Phase 9 - Structured AI Board Operations

**Goal:** Extend AI backend flow to accept board context and return validated structured outputs.

**Deliverables**

- [ ] Send board JSON, user message, and conversation history to AI service.
- [ ] Enforce structured response contract (assistant reply + optional board mutation instruction).
- [ ] Validate and sanitize AI mutations before persistence.
- [ ] Persist approved mutations and return updated board state.

**Tests**

- [ ] Unit tests for schema validation, mutation application, and rejection logic.
- [ ] Integration tests for valid AI update, invalid AI payload, and no-op reply.
- [ ] Maintain >= 80% backend unit coverage.

**Success criteria**

- [ ] AI responses are reliable, contract-safe, and persistence-safe.

## Phase 10 - AI Chat Sidebar UX

**Goal:** Deliver polished in-app sidebar chat that can drive board updates via backend AI flow.

**Deliverables**

- [ ] Build sidebar chat UI with message history.
- [ ] Connect chat UI to backend AI endpoint.
- [ ] Apply returned board updates to UI automatically after successful AI response.
- [ ] Keep visual style aligned with project color scheme and current board UI.

**Tests**

- [ ] Unit tests for chat state management and response handling.
- [ ] Integration tests for message send, reply display, and automatic board refresh.
- [ ] End-to-end flow test covering sign-in -> board -> AI request -> board update visible.
- [ ] Maintain >= 80% frontend unit coverage.

**Success criteria**

- [ ] User can chat with AI in sidebar and see approved board changes reflected immediately.

## Phase Completion Checklist

- [ ] All deliverables checked for completed phase.
- [ ] Unit coverage target met (>= 80%) for impacted package(s).
- [ ] Integration tests added and passing.
- [ ] Docs updated for behavior changes.
- [ ] User sign-off obtained when phase includes a checkpoint.
# Frontend Overview

## Purpose

This frontend is a Next.js app that currently provides a client-side Kanban demo used as the starting point for full-stack integration.

## Current Architecture

- Entry route: `src/app/page.tsx` renders `KanbanBoard`.
- Main board UI: `src/components/KanbanBoard.tsx`.
- Supporting UI components:
  - `src/components/KanbanColumn.tsx`
  - `src/components/KanbanCard.tsx`
  - `src/components/KanbanCardPreview.tsx`
  - `src/components/NewCardForm.tsx`
- Board data + core utility logic: `src/lib/kanban.ts`.

## Key Behavior (Current State)

- Uses local in-memory board data (`initialData`) and does not yet call backend APIs.
- Supports drag-and-drop card movement with `@dnd-kit`.
- Includes card creation/editing interactions in the frontend demo state.
- No login gate is implemented in frontend yet.

## Test Setup

- Unit tests: Vitest + Testing Library.
- End-to-end tests: Playwright.
- Existing tests include:
  - `src/lib/kanban.test.ts`
  - `src/components/KanbanBoard.test.tsx`
  - `tests/kanban.spec.ts`

## Commands

- Install: `npm install`
- Dev server: `npm run dev`
- Unit tests: `npm run test:unit`
- E2E tests: `npm run test:e2e`
- Full test suite: `npm run test:all`

## Constraints for Ongoing Work

- Preserve the current Kanban UX as backend integration is added.
- Keep components focused and avoid premature abstraction.
- Add tests with each behavior change and maintain minimum 80% unit coverage.

# Implementation Plan: Go Game Engine (Static SPA)

**Branch**: `001-go-game-engine` | **Date**: 2026-03-29 | **Spec**: [specs/001-go-game-engine/spec.md](spec.md)
**Input**: Architect a 100% client-side strictly static SPA using React, TS, and Vite for GitHub Pages. Local hot-seat multiplayer only. Core engine in `src/core/` with pure TS.

## Summary

Implement a local two-player Go game engine as a static React SPA. The core logic (rules for liberties, capture, Ko, and suicide) will be isolated in a pure TypeScript domain layer (`src/core/`). The UI will be built with React and standard hooks, deployed as a static site to GitHub Pages.

## Technical Context

**Language/Version**: TypeScript 5.x, React 18.x, Vite 5.x  
**Primary Dependencies**: React, Vitest (for TDD), Lucide-React (optional for icons)  
**Storage**: N/A (In-memory state via React Hooks)  
**Testing**: Vitest (NEEDS CLARIFICATION: confirm testing framework)  
**Target Platform**: GitHub Pages (Static Hosting)
**Project Type**: Static Web Application (SPA)  
**Performance Goals**: Move validation and capture detection < 50ms per move.  
**Constraints**: Zero server-side code, No APIs, Local Hot-Seat multiplayer only.  
**Scale/Scope**: 19x19 board support, full Go rule enforcement (Japanese rules).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **I. Absolute Separation**: Logic will reside in `src/core/`, UI in `src/components/`.
- [x] **II. Strict Typing**: TypeScript interfaces for all domain entities (Board, Stone, etc.).
- [x] **III. TDD**: Core algorithms (liberties, capture, Ko) will be developed using Vitest with TDD.
- [x] **IV. Predictable State**: Using `useReducer` or functional `useState` updates to ensure immutability.
- [x] **V. DDD**: Using ubiquitous Go terminology in code (Liberties, Atari, Ko).

## Project Structure

### Documentation (this feature)

```text
specs/001-go-game-engine/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A for this internal engine)
└── tasks.md             # Phase 2 output (created by /speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── core/                # Pure TS Game Engine (Domain Layer)
│   ├── rules/           # Capture, Ko, Suicide logic
│   ├── board/           # Board state and transformations
│   └── types/           # Domain types (Stone, Color, Point)
├── components/          # React Components (UI Layer)
│   ├── Board/
│   ├── Controls/
│   └── Status/
├── hooks/               # Custom React Hooks for game state
├── assets/              # CSS and static assets
└── App.tsx              # Main Entry point

tests/
├── unit/                # Core engine tests (TDD)
└── integration/         # Component and state tests
```

**Structure Decision**: Single project structure with a clean separation between `src/core` (Domain) and `src/components` (UI) to satisfy the Constitution.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |

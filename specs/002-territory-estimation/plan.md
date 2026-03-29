# Implementation Plan: Territory Estimation

**Branch**: `002-territory-estimation` | **Date**: 2026-03-29 | **Spec**: [specs/002-territory-estimation/spec.md]
**Input**: Feature specification from `/specs/002-territory-estimation/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Implement a territory estimation feature for the Go engine using a Flood Fill algorithm to identify strictly enclosed areas. The feature includes a toggleable UI overlay with professional-style markers (black/white squares) and dynamic updates during gameplay.

## Technical Context

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: React 18.x, Vite 5.x, Lucide-React (optional)  
**Storage**: N/A (Transient client-side state)  
**Testing**: Vitest (TDD mandatory for core logic)  
**Target Platform**: Web (React)
**Project Type**: Web Application  
**Performance Goals**: < 50ms calculation time for 19x19 board (SC-001)  
**Constraints**: 100% client-side pure functions, absolute separation of logic and UI (Constitution I)  
**Scale/Scope**: Support 9x9, 13x13, and 19x19 boards

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Compliance Strategy | Status |
|-----------|---------------------|--------|
| I. Separation of Logic/UI | `calculateTerritory` will be a pure function in `src/core/rules/territory.ts`. | ✅ PASS |
| II. Strict Typing | Define `TerritoryOwner` enum and `TerritoryMap` type. No `any` allowed. | ✅ PASS |
| III. TDD | Write failing tests in `tests/unit/territory.test.ts` before algorithm implementation. | ✅ PASS |
| IV. Predictable State | React state will use non-mutating updates for `isEstimating`. | ✅ PASS |
| V. DDD | Territory logic belongs to the domain layer, using standard Go terminology. | ✅ PASS |

## Project Structure

### Documentation (this feature)

```text
specs/002-territory-estimation/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (not created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── core/
│   ├── rules/
│   │   └── territory.ts     # NEW: Pure logic for estimation
│   └── types/
│       └── index.ts        # UPDATE: Territory types
├── components/
│   ├── Board/
│   │   ├── Board.tsx       # UPDATE: Render markers
│   │   └── Board.css       # UPDATE: Marker styles
│   └── Controls/
│       └── Controls.tsx    # UPDATE: Toggle button
└── hooks/
    └── useGame.ts          # UPDATE: UI state for estimation

tests/
└── unit/
    └── territory.test.ts   # NEW: TDD for algorithm
```

**Structure Decision**: Single project structure (Option 1) as it is a pure React/TS application. Logic is isolated in `src/core`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |

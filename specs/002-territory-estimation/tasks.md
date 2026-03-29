---
description: "Task list for Territory Estimation feature implementation"
---

# Tasks: Territory Estimation

**Input**: Design documents from `/specs/002-territory-estimation/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: TDD is mandatory for core logic per Constitution III. Unit tests for the algorithm are included in Phase 2.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 [P] Update `src/core/types/index.ts` with `TerritoryOwner` and `TerritoryMap` types
- [X] T002 [P] Create `tests/unit/territory.test.ts` with basic test structure

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 [P] Implement `calculateTerritory` pure function in `src/core/rules/territory.ts` (Flood Fill algorithm)
- [X] T004 [P] Add comprehensive unit tests for `calculateTerritory` in `tests/unit/territory.test.ts` (Empty board, small board, complex enclosures)
- [X] T005 [P] Verify `calculateTerritory` performance (< 50ms for 19x19) in `tests/unit/territory.test.ts` (SC-001)

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Toggle Territory Estimation (Priority: P1) 🎯 MVP

**Goal**: Implement a toggle button that shows/hides territory markers based on the current board state.

**Independent Test**: The "Toggle Territory" button exists, and clicking it displays/hides basic markers on the board.

### Implementation for User Story 1

- [X] T006 [US1] Update `src/hooks/useGame.ts` to manage `isEstimating` in React state and provide `toggleTerritory` callback
- [X] T007 [US1] Update `src/components/Controls/Controls.tsx` to include "Toggle Territory" button
- [X] T008 [US1] Update `src/components/Board/Board.tsx` to accept `territoryMap` and `isEstimating` props
- [X] T009 [US1] Implement basic marker rendering logic in `src/components/Board/Board.tsx` using `territoryMap`

**Checkpoint**: At this point, User Story 1 is functional and testable independently.

---

## Phase 4: User Story 2 - Dynamic Update on Move (Priority: P2)

**Goal**: Ensure territory markers update automatically when a move is made while estimation is active.

**Independent Test**: Place a stone while estimation is ON and verify markers update immediately.

### Implementation for User Story 2

- [X] T010 [US2] Update `src/hooks/useGame.ts` to trigger `calculateTerritory` whenever `gameState` changes if `isEstimating` is true
- [X] T011 [US2] Add integration test in `tests/integration/Board.test.tsx` (or new file) to verify markers update after a move

**Checkpoint**: At this point, User Stories 1 and 2 work together seamlessly.

---

## Phase 5: User Story 3 - Visual Distinction (Priority: P3)

**Goal**: Apply professional styling to territory markers (black/white squares).

**Independent Test**: Visual inspection confirms markers are small squares (black for Black, white with border for White).

### Implementation for User Story 3

- [X] T012 [P] [US3] Define CSS styles for black and white territory markers in `src/components/Board/Board.css`
- [X] T013 [US3] Update `src/components/Board/Board.tsx` to render professional-style square markers for Black and White territory

**Checkpoint**: All user stories are now independently functional and visually complete.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T014 [P] Update `README.md` with Territory Estimation usage instructions
- [X] T015 Run all tests and verify SC-001, SC-002, and SC-003 criteria (including manual verification of marker visibility on both dark and light board themes)
- [X] T016 Final code cleanup and documentation update in `specs/002-territory-estimation/research.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2)
- **User Story 2 (P2)**: Depends on US1 for the toggle state and base UI integration
- **User Story 3 (P3)**: Depends on US1 for the marker rendering logic

### Parallel Opportunities

- T001 and T002 can run in parallel
- Phase 2 tasks (T003, T004, T005) can be developed iteratively
- T012 can be done in parallel with Phase 3 or 4

---

## Parallel Example: User Story 3

```bash
# Parallel styling and logic update
Task: "Define CSS styles for black and white territory markers in src/components/Board/Board.css"
Task: "Update src/components/Board/Board.tsx to render professional-style square markers"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Verify the toggle works and markers appear correctly.

### Incremental Delivery

1. Foundation ready (Phase 1 & 2)
2. MVP ready (Phase 3)
3. Dynamic updates added (Phase 4)
4. Visual polish applied (Phase 5)
5. Final verification (Phase 6)

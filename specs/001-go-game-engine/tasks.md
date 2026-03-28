# Tasks: Go Game Engine

**Input**: Design documents from `specs/001-go-game-engine/`
**Prerequisites**: plan.md, spec.md, data-model.md, contracts/engine-api.md

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Initialize Vite/React/TypeScript project in repository root
- [X] T002 [P] Setup Vitest and basic test configuration in `vitest.config.ts` and `tests/setup.ts`
- [X] T003 [P] Configure ESLint and Prettier for the project

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [X] T004 Define core domain types (StoneColor, Point, Group, GameState) in `src/core/types/index.ts`
- [X] T005 Implement Board state and basic utility functions (get, set, neighbors) in `src/core/board/board.ts`
- [X] T006 Create initial GameState initialization logic (`createNewGame`) in `src/core/engine.ts`

**Checkpoint**: Foundation ready - domain types and board utilities are available for user stories.

---

## Phase 3: User Story 1 - Basic Stone Placement & Turn Management (Priority: P1) 🎯 MVP

**Goal**: Enable placing stones on an empty grid and switching turns.

**Independent Test**: Start a new game, place a stone at (3,3), verify it appears, and check that the turn switched to White.

### Tests for User Story 1 (TDD)

- [X] T007 [P] [US1] Unit test for `placeStone` basic placement and turn switching in `tests/unit/engine.test.ts`
- [X] T008 [P] [US1] Component test for Board rendering in `tests/integration/Board.test.tsx`

### Implementation for User Story 1

- [X] T009 [US1] Implement basic `placeStone` (no rules yet) in `src/core/engine.ts`
- [X] T010 [US1] Create basic `Board` component using CSS Grid in `src/components/Board/Board.tsx`
- [X] T011 [US1] Implement `useGame` hook for managing game state in `src/hooks/useGame.ts`
- [X] T012 [US1] Create `Status` component to display current turn in `src/components/Status/Status.tsx`
- [X] T013 [US1] Assemble main entry point with Board and Status in `src/App.tsx`

**Checkpoint**: MVP Ready - Stones can be placed on a grid and turns alternate.

---

## Phase 4: User Story 2 - Group Liberties and Capture (Priority: P1)

**Goal**: Automatically remove enemy stones that have no liberties.

**Independent Test**: Surround a white stone with black stones and verify the white stone is removed and black's capture count increases.

### Tests for User Story 2 (TDD)

- [ ] T014 [P] [US2] Unit test for group detection and liberty counting in `tests/unit/rules.test.ts`
- [ ] T015 [P] [US2] Unit test for capture detection and board removal in `tests/unit/rules.test.ts`

### Implementation for User Story 2

- [ ] T016 [US2] Implement group detection and liberty counting logic in `src/core/rules/liberties.ts`
- [ ] T017 [US2] Implement capture logic and capture count updates in `src/core/rules/capture.ts`
- [ ] T018 [US2] Integrate capture logic into the `placeStone` function in `src/core/engine.ts`
- [ ] T019 [US2] Update `Status` component to display capture counts for both players in `src/components/Status/Status.tsx`
- [ ] T020 [P] [US2] Implement `getLiberties` function for future UI hints in `src/core/engine.ts`

**Checkpoint**: Core Mechanic Ready - Capture logic is functional and integrated.

---

## Phase 5: User Story 3 - Suicide and Ko Rule Enforcement (Priority: P2)

**Goal**: Prevent illegal moves according to Go rules and allow Undo.

**Independent Test**: Attempt a move into a surrounded area with no liberties; verify rejection. Perform a Ko capture and try to recapture immediately; verify rejection.

### Tests for User Story 3 (TDD)

- [ ] T021 [P] [US3] Unit test for Suicide rule enforcement (including exception for capture) in `tests/unit/rules.test.ts`
- [ ] T022 [P] [US3] Unit test for Ko rule enforcement using board history in `tests/unit/rules.test.ts`
- [ ] T023 [P] [US3] Unit test for `undoMove` functionality in `tests/unit/engine.test.ts`

### Implementation for User Story 3

- [ ] T024 [US3] Implement Suicide rule logic in `src/core/rules/suicide.ts`
- [ ] T025 [US3] Implement Ko rule logic by comparing board states in history in `src/core/rules/ko.ts`
- [ ] T026 [US3] Implement `undoMove` logic (popping history stack) in `src/core/engine.ts`
- [ ] T027 [US3] Create `Controls` component with an "Undo" button in `src/components/Controls/Controls.tsx`
- [ ] T028 [US3] Integrate `undoMove` into the `useGame` hook in `src/hooks/useGame.ts`

**Checkpoint**: Rule Integrity Ready - All core Go rules are enforced and Undo is functional.

---

## Phase 6: User Story 4 - Passing and Game End (Priority: P3)

**Goal**: Support passing turns and detect game end.

**Independent Test**: Click "Pass" twice and verify the game state is marked as "Finished".

### Tests for User Story 4 (TDD)

- [ ] T029 [P] [US4] Unit test for consecutive passes and game termination in `tests/unit/engine.test.ts`

### Implementation for User Story 4

- [ ] T030 [US4] Implement `passTurn` logic and game end detection in `src/core/engine.ts`
- [ ] T031 [US4] Add "Pass" button to the `Controls` component in `src/components/Controls/Controls.tsx`
- [ ] T032 [US4] Update `Status` component to show "Game Over" and final results in `src/components/Status/Status.tsx`

**Checkpoint**: Full Lifecycle Ready - Game can be started, played to completion, and terminated correctly.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T033 [P] Add visual marker for the last placed stone on the board in `src/components/Board/Board.tsx`
- [ ] T034 [P] Implement board size selection (9x9, 13x13, 19x19) in `src/App.tsx`
- [ ] T035 [P] Apply final CSS styling for stones, board, and layout in `src/assets/main.css`
- [ ] T036 Run final verification against `quickstart.md` scenarios

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Setup. BLOCKS all user stories.
- **User Stories (Phase 3-6)**: Depend on Foundational completion.
  - Can proceed sequentially (US1 → US2 → US3 → US4) or in parallel where marked [P].
- **Polish (Phase 7)**: Depends on completion of core functionality.

### Parallel Opportunities

- T002, T003 (Setup)
- T007, T008 (US1 Tests)
- T014, T015 (US2 Tests)
- T021, T022, T023 (US3 Tests)
- T033, T034, T035 (Polish)

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup and Foundational phases.
2. Complete Phase 3 (US1).
3. Validate basic placement and turn management.

### Incremental Delivery

1. Foundation + US1 → Playable grid.
2. Add US2 → Capture mechanics.
3. Add US3 → Full rule enforcement + Undo.
4. Add US4 → Complete game loop.

# Quickstart: Territory Estimation Implementation

## Prerequisites
- [x] Feature Specification: `specs/002-territory-estimation/spec.md`
- [x] Technical Plan: `specs/002-territory-estimation/plan.md`
- [x] Data Model & Contracts: `specs/002-territory-estimation/data-model.md`

## Implementation Steps

### 1. Domain Logic (TDD)
1. Create `tests/unit/territory.test.ts`.
2. Add tests for:
   - Empty board (all neutral).
   - Single point enclosed by Black (Black territory).
   - Area enclosed by White (White territory).
   - Area touching both Black and White (Neutral).
3. Implement `src/core/rules/territory.ts` using BFS Flood Fill until tests pass.

### 2. State Integration
1. Update `src/core/types/index.ts` with territory types.
2. Update `src/hooks/useGame.ts`:
   - Add `isEstimating` state.
   - Add `toggleTerritory` callback.
   - Add `territoryMap` derived state (memoized).

### 3. UI Layer
1. Update `src/components/Controls/Controls.tsx` with the toggle button.
2. Update `src/components/Board/Board.tsx` to pass territory ownership to intersections.
3. Update `Board.css` with square marker styles.

## Verification
- Run `npm test` to verify domain logic.
- Run `npm run lint` for type safety.
- Manually test in browser on various board sizes.

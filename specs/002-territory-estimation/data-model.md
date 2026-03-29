# Data Model: Territory Estimation

## Entities

### TerritoryOwner (Enum)
Represents the estimated ownership of an empty intersection.

- **BLACK**: Enclosed strictly by Black stones.
- **WHITE**: Enclosed strictly by White stones.
- **NONE**: Neutral or not enclosed (Dame).

### TerritoryMap (Type)
A 1D array of `TerritoryOwner` of length `size * size`.

```typescript
export type TerritoryOwner = 'BLACK' | 'WHITE' | 'NONE';
export type TerritoryMap = TerritoryOwner[];
```

## Relationships

- **Board**: One `Board` has one derived `TerritoryMap`.
- **GameState**: One `GameState` can have a derived `TerritoryMap`.
- **UI State**: The `isEstimating` toggle determines whether the `TerritoryMap` is rendered on the `Board`.

## Validation Rules

1. `TerritoryMap` length MUST match `Board.intersections` length.
2. An intersection MUST NOT have a `TerritoryOwner` if `Board.intersections[i] !== NONE` (i.e., stones don't have territory ownership, only empty points).
3. If an intersection is `NONE` in `TerritoryMap`, it MUST NOT display a marker in the UI.

## State Transitions

- **Toggle On**: `useGame` hook sets `isEstimating` to `true`.
- **Place Stone**: `useGame` hook updates `gameState`, which triggers re-calculation of `TerritoryMap` if `isEstimating` is `true`.
- **Undo Move**: Same as `Place Stone`.
- **Toggle Off**: `useGame` hook sets `isEstimating` to `false`.

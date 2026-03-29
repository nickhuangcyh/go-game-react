# Engine Contract: Territory Estimation

The Go engine provides a pure function for territory estimation.

## API: calculateTerritory

### Parameters
- `board`: `Board` (The current board state, 1D array of `StoneColor`)

### Returns
- `territoryMap`: `TerritoryMap` (An array of ownership strings matching board size)

### Interface Definition
```typescript
/**
 * Estimates territory based on strictly enclosed areas.
 * @param board The Go board state.
 * @returns An array representing estimated ownership ('BLACK', 'WHITE', or 'NONE').
 */
export function calculateTerritory(board: Board): TerritoryMap;
```

### Constraints
- Input `Board` MUST BE treated as read-only.
- The returned `TerritoryMap` MUST BE a new array.
- The function MUST NOT depend on any external state or I/O.
- The function MUST NOT have any side effects.

### Expected Behavior
1. For each connected component of empty points:
   a. Check its neighbors.
   b. If all neighbors are of color X -> return color X for all points in component.
   c. If neighbors include both colors or NO colors -> return 'NONE' for all points in component.
2. For points occupied by stones, return 'NONE'.

# Data Model: Go Game Engine

## Core Types

### `StoneColor` (Enum)
- `BLACK`
- `WHITE`
- `NONE` (Empty intersection)

### `Point` (Type)
- `x: number` (0-18)
- `y: number` (0-18)
- `index: number` (Calculated as `y * size + x`)

### `Group` (Interface)
- `color: StoneColor`
- `stones: number[]` (Array of indices)
- `liberties: Set<number>` (Set of indices representing empty neighbors)

## Board Model

### `Board` (Interface)
- `size: number` (9, 13, or 19)
- `intersections: StoneColor[]` (1D array of length `size * size`)

## Game State

### `GameState` (Interface)
- `board: Board`
- `turn: StoneColor` (Whose turn is it now?)
- `captures: { BLACK: number; WHITE: number }`
- `history: Board[]` (Stack of previous board states for Undo and Ko check)
- `lastMove: number | null` (Index of the most recently placed stone)
- `status: 'PLAYING' | 'FINISHED'`
- `passes: number` (Count of consecutive passes: 0, 1, or 2)

## Domain Transitions (Pure Functions)

### `placeStone(state, position): Result<GameState>`
- Validates: Position empty, not suicide, not Ko violation.
- Performs: Capture calculation, turn update, history push.

### `passTurn(state): GameState`
- Updates `passes` count.
- Switches turn.
- Ends game if `passes == 2`.

### `undo(state): GameState`
- Pops the `history` stack and restores the previous board and turn.

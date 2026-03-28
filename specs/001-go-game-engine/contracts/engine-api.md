# Core Engine Contracts

## Game Logic Interface

The core engine exports the following pure functions:

### `createNewGame(size: 9 | 13 | 19): GameState`
Initializes a new Go game state with the given board size.

### `placeStone(state: GameState, pos: Point): MoveResult`
Evaluates a stone placement at the specified position.
- **Success**: Returns the new `GameState` after captures and turn switch.
- **Error**: Returns the reason (e.g., "POINT_NOT_EMPTY", "SUICIDE_MOVE", "KO_VIOLATION").

### `passTurn(state: GameState): GameState`
Handles a player passing their turn. Returns the updated state.

### `undoMove(state: GameState): GameState`
Reverts the game state to the previous move.

### `getLiberties(board: Board, pos: Point): number`
Calculates the number of liberties for the stone or group at the given position. Useful for UI hints.

---

## Data Structures

### `MoveResult` (Union)
- `{ success: true, newState: GameState }`
- `{ success: false, error: string }`

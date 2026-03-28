# Research: Go Game Engine (Static SPA)

## Decision: Testing Framework
- **Choice**: Vitest
- **Rationale**: Built-in support for Vite, ESM-first, and extremely fast for unit tests. Aligns with the project's Vite-based architecture.
- **Alternatives considered**: Jest (requires more configuration for TS/Vite), Mocha/Chai.

## Decision: Board Representation
- **Choice**: 1D Array of size N*N
- **Rationale**: Simplifies coordinate to index mapping, improves performance for neighbor lookups (up: -N, down: +N, left: -1, right: +1), and is easier to clone for immutability.
- **Alternatives considered**: 2D Array (more intuitive but slightly slower and more complex for clones).

## Decision: Capture & Liberties Algorithm
- **Choice**: Breadth-First Search (BFS) with Group Tracking
- **Rationale**: BFS is ideal for finding all stones in a connected group. Once a group is identified, checking if it has any adjacent empty points (liberties) is straightforward.
- **Algorithm Outline**:
  1. When a stone is placed at `P`, find all enemy neighbors.
  2. For each enemy neighbor, perform BFS to find its entire group.
  3. If a group has 0 liberties, remove it (Capture).
  4. Perform the same check for the placed stone's group (Suicide check).

## Decision: Ko Rule Enforcement (Simple Ko)
- **Choice**: Store the hash of the board state immediately preceding the current move.
- **Rationale**: Japanese rules typically use "Simple Ko". Storing a hash of the *previous* board state allows a simple `O(1)` or `O(N)` check to ensure the board does not return to the exact same state. Zobrist Hashing could be used for even higher efficiency, but for a 19x19 board, a simple stringified array hash is sufficient.
- **Alternatives considered**: Storing the entire history (excessive memory usage for just Ko), Super Ko (unnecessary for Japanese rules).

## Decision: State Management
- **Choice**: `useReducer` with a Domain-Logic Reducer
- **Rationale**: The Go game state is complex (board, turns, captures, history). `useReducer` keeps the state transition logic concentrated and separate from the UI components, aligning with the Constitution's separation of concerns.

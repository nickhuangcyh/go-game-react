# Feature Specification: Go Game Engine

**Feature Branch**: `001-go-game-engine`  
**Created**: 2026-03-28  
**Status**: Draft  
**Input**: User description: "Develop a local two-player Go (Weiqi / Baduk) game engine. The game consists of a 19x19 grid board. Two players (Black and White) take turns placing one stone on an empty intersection. Core Rules to specify: 1. Liberties (氣): A stone or a connected group of stones of the same color must have at least one orthogonally adjacent empty point (Liberty) to remain on the board. 2. Capture (提子): If a stone is placed so that an adjacent enemy group's liberties are reduced to zero, that enemy group is removed from the board. 3. Suicide Rule (禁入點): A player cannot place a stone that would result in their own group having zero liberties, UNLESS that placement simultaneously captures an enemy group (opening up a liberty). 4. Ko Rule (打劫): A player may not make a move that returns the board to the exact same state it was in prior to their opponent's last move. The application should track the current turn, captured stones count for both colors, and allow passing a turn. The game ends when both players pass consecutively."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Basic Stone Placement & Turn Management (Priority: P1)

As a player, I want to place a stone on an empty intersection and have the turn automatically switch to my opponent, so that we can play a game of Go.

**Why this priority**: Essential for the core game loop. Without stone placement and turn management, there is no game.

**Independent Test**: Can be tested by starting a game, placing a stone at (10,10), verifying the stone is there, and confirming it is now the other player's turn.

**Acceptance Scenarios**:

1. **Given** a new game on a 19x19 board, **When** Black places a stone at (10,10), **Then** a Black stone appears at (10,10) and it becomes White's turn.
2. **Given** White's turn, **When** White places a stone at (11,11), **Then** a White stone appears at (11,11) and it becomes Black's turn.
3. **Given** a stone at (10,10), **When** a player tries to place a stone at (10,10), **Then** the move is rejected and the turn remains with the current player.

---

### User Story 2 - Group Liberties and Capture (Priority: P1)

As a player, I want the engine to automatically remove enemy stones that have no liberties, so that the game follows the standard rules of Go.

**Why this priority**: Core mechanic of Go. Capturing stones is how the game is won and how the board state evolves.

**Independent Test**: Surround a single enemy stone on all four sides and verify it is removed from the board and added to the captured count.

**Acceptance Scenarios**:

1. **Given** a White stone at (10,10), **When** Black places stones at (9,10), (11,10), (10,9), and (10,11), **Then** the White stone is removed and Black's capture count increases by 1.
2. **Given** a group of two White stones at (10,10) and (10,11), **When** Black occupies all external liberties of this group, **Then** both White stones are removed and Black's capture count increases by 2.

---

### User Story 3 - Suicide and Ko Rule Enforcement (Priority: P2)

As a player, I want the engine to prevent illegal moves according to the Suicide and Ko rules, so that the game integrity is maintained.

**Why this priority**: Prevents infinite loops (Ko) and illegal placements that would immediately be captured (Suicide).

**Independent Test**: Attempt a suicide move and verify rejection. Set up a Ko situation and attempt to recapture immediately.

**Acceptance Scenarios**:

1. **Given** a spot surrounded by White stones, **When** Black attempts to place a stone there (resulting in 0 liberties), **Then** the move is rejected UNLESS it captures at least one White stone.
2. **Given** a Ko situation where Black just captured a White stone, **When** White attempts to immediately recapture in the same spot (returning the board to the previous state), **Then** the move is rejected.

---

### User Story 4 - Passing and Game End (Priority: P3)

As a player, I want to be able to pass my turn and have the game end when both players pass consecutively, so that we can finish the game when no more useful moves are possible.

**Why this priority**: Necessary for formal game completion.

**Independent Test**: Have Black pass, then White pass, and verify the game state is marked as "Finished".

**Acceptance Scenarios**:

1. **Given** it is Black's turn, **When** Black passes, **Then** it becomes White's turn.
2. **Given** Black just passed, **When** White passes, **Then** the game ends.
3. **Given** Black passed but White then placed a stone, **When** Black places a stone, **Then** the game continues.

### Edge Cases

- **Capture on the edge/corner**: Stones on the edge have only 3 liberties; corner stones have 2. Capture logic must correctly handle these boundaries.
- **Simultaneous Capture and Suicide**: If a move would have 0 liberties but also reduces an enemy group to 0 liberties, the capture happens first, and the move is legal (Suicide rule exception).
- **19x19 Boundary**: Moves outside (1,1) to (19,19) must be rejected.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST maintain a 19x19 grid representation of the board.
- **FR-002**: System MUST track the current player's turn (Black starts).
- **FR-003**: System MUST track the number of captured stones for both Black and White.
- **FR-004**: System MUST identify "groups" of connected stones of the same color (orthogonally adjacent).
- **FR-005**: System MUST calculate liberties for every group on the board.
- **FR-006**: System MUST remove stones from the board when their group's liberties reach zero due to an opponent's move.
- **FR-007**: System MUST prevent "Suicide" moves unless they result in a capture.
- **FR-008**: System MUST prevent moves that violate the "Ko" rule (returning board to the state exactly 1 move prior).
- **FR-009**: System MUST allow a player to "Pass" their turn.
- **FR-010**: System MUST terminate the game after two consecutive passes.

### Key Entities *(include if feature involves data)*

- **Board**: A 19x19 grid containing Intersections.
- **Intersection**: A point on the grid that can be Empty, or occupied by a Black Stone or a White Stone.
- **Stone**: A game piece placed by a player.
- **Group**: A set of one or more stones of the same color connected orthogonally.
- **Liberty**: An empty intersection adjacent to a stone or group.
- **Game State**: Includes the board configuration, current turn, capture counts, and pass history.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% adherence to core Go rules (Liberties, Capture, Suicide, Ko) in all test cases.
- **SC-002**: Move validation and board state update (including capture detection) must complete in under 50ms per move.
- **SC-003**: System accurately tracks and displays capture counts for both players throughout the game.
- **SC-004**: Game correctly identifies end-of-game state upon two consecutive passes.

## Assumptions

- **Local Play**: Both players are interacting with the same instance of the engine (no networking specified for this version).
- **Standard Rules**: Using standard Go rules (likely Japanese or Chinese, though capture/liberty logic is largely identical).
- **No Scoring**: Manual scoring or a separate feature will handle territory counting; this engine focuses on the game mechanics and state.
- **UI Independence**: The engine logic will be separate from the rendering logic (as per the Constitution).

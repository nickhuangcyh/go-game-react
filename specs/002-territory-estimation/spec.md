# Feature Specification: Territory Estimation (形勢判斷)

**Feature Branch**: `002-territory-estimation`  
**Created**: 2026-03-29  
**Status**: Draft  
**Input**: User description: "Add a \"Territory Estimation\" (形勢判斷) feature to the existing Go engine. Requirements: 1. Add a \"Toggle Territory\" button to the UI. 2. When toggled ON, the board should visually display the estimated territory for both Black and White on empty intersections. 3. Visual representation: Use small square markers on the intersections (black squares for Black's territory, white squares with a dark border for White's territory), exactly like professional Go servers (e.g., Fox Weiqi). 4. Territory Rule: An empty intersection is considered Black's territory if all empty paths from it strictly lead to Black stones (it is completely enclosed by Black). The same applies to White. 5. Neutral points (Dame): If a connected group of empty intersections touches BOTH Black and White stones, it is neutral and receives no marker. 6. The game can continue to be played; if a stone is placed while the estimation is ON, the territory markers must update dynamically or the toggle should automatically turn OFF."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Toggle Territory Estimation (Priority: P1)

As a Go player, I want to see an estimation of which empty intersections belong to which player so I can judge the current state of the game.

**Why this priority**: This is the core functionality requested by the user.

**Independent Test**: The toggle button can be clicked, and markers appear/disappear on the board based on the board state.

**Acceptance Scenarios**:

1. **Given** a game in progress, **When** I click the "Toggle Territory" button, **Then** small square markers should appear on empty intersections that are strictly enclosed by one player's stones.
2. **Given** territory estimation is ON, **When** I click the "Toggle Territory" button again, **Then** all territory markers should be removed from the board.

---

### User Story 2 - Dynamic Update on Move (Priority: P2)

As a Go player, I want the territory estimation to update automatically if I place a stone while it's active.

**Why this priority**: Ensures the visual state remains consistent with the board state without requiring manual re-toggling.

**Independent Test**: Place a stone while estimation is ON and verify markers update immediately.

**Acceptance Scenarios**:

1. **Given** territory estimation is ON, **When** I place a stone on the board, **Then** the territory markers should automatically recalculate and update to reflect the new board state.
2. **Given** territory estimation is ON, **When** I place a stone that captures opponent stones, **Then** the newly empty areas should be correctly re-evaluated for territory markers.

---

### User Story 3 - Visual Distinction (Priority: P3)

As a Go player, I want the markers to look professional (black squares for Black, white squares with dark border for White) so they are easy to distinguish from stones.

**Why this priority**: Essential for UX clarity and professional feel (matching industry standards like Fox Weiqi).

**Independent Test**: Visual inspection of markers on the board.

**Acceptance Scenarios**:

1. **Given** territory estimation is ON, **When** an intersection is identified as Black's territory, **Then** a small black square marker should be displayed at its center.
2. **Given** territory estimation is ON, **When** an intersection is identified as White's territory, **Then** a small white square marker with a dark border should be displayed at its center.
3. **Given** territory estimation is ON, **When** an intersection is neutral (Dame), **Then** no marker should be displayed.

### Edge Cases

- **Completely empty board**: No territory should be assigned; all points are neutral.
- **Opponent stones inside territory**: If a White stone is inside a Black-enclosed area, the area is NOT considered Black's territory until the White stone is captured (following the "all empty paths lead to X" rule).
- **Board boundaries**: The edges of the board act as walls. An area is territory if it is enclosed by stones of one color and/or the board edges.
- **Large empty areas**: The algorithm must efficiently handle large connected components of empty intersections.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a "Toggle Territory" button in the game controls UI.
- **FR-002**: System MUST implement a territory estimation algorithm based on path connectivity (Flood Fill).
- **FR-003**: An empty intersection MUST be marked as Black's territory if all reachable empty intersections and adjacent stones are exclusively Black (or board edges).
- **FR-004**: An empty intersection MUST be marked as White's territory if all reachable empty intersections and adjacent stones are exclusively White (or board edges).
- **FR-005**: If a group of empty intersections is reachable from BOTH Black and White stones, they MUST be considered neutral (Dame).
- **FR-006**: System MUST update the territory estimation display immediately when a new stone is placed or a move is undone, if the toggle is ON.
- **FR-007**: Territory markers MUST be visually distinct from Go stones (small squares vs large circles).
- **FR-008**: The toggle state MUST be persisted in React state (maintained across re-renders within the current page session, but may reset on page reload or game restart).

### Key Entities *(include if feature involves data)*

- **Territory State**: A property of an intersection representing its estimated ownership (`NONE`, `BLACK_TERRITORY`, `WHITE_TERRITORY`).
- **Control Panel**: UI component containing the "Toggle Territory" button.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Territory estimation calculation completes in under 50ms for a 19x19 board to ensure no UI lag.
- **SC-002**: 100% accuracy in identifying "strictly enclosed" territory according to the path-based rule specified.
- **SC-003**: Visual markers are correctly centered on intersections and visible on both dark and light board themes.

## Assumptions

- **Simplified Rule**: We are following the strict "path leads to" rule provided by the user, which does not account for dead stones that haven't been captured yet.
- **Dynamic Update Preference**: The user offered a choice between dynamic update and auto-toggle OFF; we have chosen dynamic update for a superior user experience.
- **Standard Board Sizes**: The feature will work correctly on all supported board sizes (9x9, 13x13, 19x19).

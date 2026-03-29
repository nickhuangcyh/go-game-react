# Research: Territory Estimation Algorithm

## Decision: Flood Fill with Connected Components

We will implement a Flood Fill (BFS) algorithm to find all connected components of empty intersections.

### Rationale
- **Accuracy**: The requirement is "strictly enclosed". Flood fill is the most reliable way to find all empty points reachable from a starting point and then check their boundaries.
- **Complexity**: O(N) where N is the number of intersections (361 for 19x19), which is very efficient for our 50ms requirement.
- **Ruleset Alignment**: This aligns perfectly with the "all empty paths lead to X" requirement.

### Algorithm Detail
1. Initialize an `ownership` array of size `size*size` with `UNKNOWN`.
2. Iterate through all intersections. If `intersections[i] === NONE` and `ownership[i] === UNKNOWN`:
   a. Start a BFS from `i` to find all connected empty intersections.
   b. During BFS, track all adjacent non-empty stones.
   c. If all adjacent stones are BLACK -> mark all points in the component as `BLACK_TERRITORY`.
   d. If all adjacent stones are WHITE -> mark all points in the component as `WHITE_TERRITORY`.
   e. If adjacent to BOTH or NO stones (empty board) -> mark all as `NEUTRAL`.
3. Return the `ownership` array.

## Performance Considerations

### Rationale
A 19x19 board has 361 points. A simple BFS in TypeScript will execute in significantly less than 1ms. The 50ms target is extremely generous for this scale.

### Alternatives Considered
- **Influence Maps**: Rejected because they provide "probabilistic" ownership, which doesn't meet the "strictly enclosed" requirement.
- **Monte Carlo Tree Search (MCTS)**: Overkill for simple territory estimation and too slow for real-time UI updates.

## Visual Styling: CSS Squares

### Rationale
Using CSS for markers is more flexible than images.
- **Black Marker**: `background-color: black; width: 30%; height: 30%;`
- **White Marker**: `background-color: white; border: 1px solid #333; width: 30%; height: 30%;`

Centered using `display: flex; justify-content: center; align-items: center;` on the intersection container.

## Unresolved Issues (Resolved)
- **Dead Stones**: Per "Assumptions" in the spec, we are NOT considering dead stones. Stones of the opposite color inside an area "break" the territory estimation as requested.
- **Dynamic Updates**: Recalculating on every move is performant enough to be the default behavior.

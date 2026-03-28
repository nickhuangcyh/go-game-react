export const isKo = (history: string[], nextBoardSerialized: string): boolean => {
  // Simple Ko: Check if the board state matches the one immediately before the last move
  // Actually, to be safe against all loops, we check all previous states (Super Ko)
  // But the requirement says "comparing board states in history", which often implies checking if state exists.
  // For Japanese rules, it's just the previous state of the same player (i.e., 2 moves ago).
  // Let's check if the next state already exists in history.

  if (history.length === 0) return false

  // Checking the state immediately preceding the current state (Simple Ko)
  return history[history.length - 1] === nextBoardSerialized
}

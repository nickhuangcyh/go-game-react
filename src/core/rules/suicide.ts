import { Board, StoneColor } from '../types'
import { setStone } from '../board/board'
import { getGroup } from './liberties'
import { findCapturedGroups } from './capture'

export const isSuicide = (board: Board, index: number, color: StoneColor): boolean => {
  // To check for suicide:
  // 1. Temporarily place the stone
  // 2. Check if it results in any enemy captures. If yes, it's NOT suicide.
  // 3. If no captures, check if the placed stone's group has any liberties.
  // 4. If 0 liberties, it IS suicide.

  const { x, y } = { x: index % board.size, y: Math.floor(index / board.size) }
  const tempBoard = setStone(board, { x, y }, color)

  const captures = findCapturedGroups(tempBoard, color)
  if (captures.length > 0) return false

  const group = getGroup(tempBoard, index)
  return group.liberties.size === 0
}

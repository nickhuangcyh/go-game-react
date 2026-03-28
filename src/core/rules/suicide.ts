import { StoneColor } from '../types/index'
import type { Board } from '../types/index'
import { setStone } from '../board/board'
import { getGroup } from './liberties'
import { findCapturedGroups } from './capture'

export const isSuicide = (board: Board, index: number, color: StoneColor): boolean => {
  const { x, y } = { x: index % board.size, y: Math.floor(index / board.size) }
  const tempBoard = setStone(board, { x, y }, color)

  const captures = findCapturedGroups(tempBoard, color)
  if (captures.length > 0) return false

  const group = getGroup(tempBoard, index)
  return group.liberties.size === 0
}

import { StoneColor } from '../types/index'
import type { Board, Group } from '../types/index'
import { getGroup } from './liberties'

export const findCapturedGroups = (board: Board, lastMoveColor: StoneColor): Group[] => {
  const enemyColor = lastMoveColor === StoneColor.BLACK ? StoneColor.WHITE : StoneColor.BLACK
  const captured: Group[] = []
  const checked = new Set<number>()

  board.intersections.forEach((color, index) => {
    if (color === enemyColor && !checked.has(index)) {
      const group = getGroup(board, index)
      if (group.liberties.size === 0) {
        captured.push(group)
      }
      group.stones.forEach((s) => checked.add(s))
    }
  })

  return captured
}

export const removeGroups = (board: Board, groups: Group[]): Board => {
  const newIntersections = [...board.intersections]
  groups.forEach((group) => {
    group.stones.forEach((index) => {
      newIntersections[index] = StoneColor.NONE
    })
  })
  return { ...board, intersections: newIntersections }
}

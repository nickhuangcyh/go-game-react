import { StoneColor } from '../types/index'
import type { Board, Group } from '../types/index'
import { getNeighbors } from '../board/board'

export const getGroup = (board: Board, index: number): Group => {
  const color = board.intersections[index]
  const stones = new Set<number>([index])
  const liberties = new Set<number>()
  const queue = [index]

  while (queue.length > 0) {
    const current = queue.shift()!
    const neighbors = getNeighbors(board, current)

    for (const neighbor of neighbors) {
      if (board.intersections[neighbor] === color) {
        if (!stones.has(neighbor)) {
          stones.add(neighbor)
          queue.push(neighbor)
        }
      } else if (board.intersections[neighbor] === StoneColor.NONE) {
        liberties.add(neighbor)
      }
    }
  }

  return {
    color,
    stones: Array.from(stones),
    liberties,
  }
}

import { StoneColor } from '../types/index'
import type { Point, Board } from '../types/index'

export const createBoard = (size: number): Board => ({
  size,
  intersections: Array(size * size).fill(StoneColor.NONE),
})

export const getIndex = (board: Board, { x, y }: Point): number => {
  if (x < 0 || x >= board.size || y < 0 || y >= board.size) return -1
  return y * board.size + x
}

export const getPoint = (board: Board, index: number): Point => ({
  x: index % board.size,
  y: Math.floor(index / board.size),
})

export const getStone = (board: Board, pos: Point): StoneColor => {
  const index = getIndex(board, pos)
  return index === -1 ? StoneColor.NONE : board.intersections[index]
}

export const setStone = (board: Board, pos: Point, color: StoneColor): Board => {
  const index = getIndex(board, pos)
  if (index === -1) return board

  const newIntersections = [...board.intersections]
  newIntersections[index] = color
  return { ...board, intersections: newIntersections }
}

export const getNeighbors = (board: Board, index: number): number[] => {
  const { x, y } = getPoint(board, index)
  const neighbors: number[] = []

  const potential = [
    { x: x - 1, y },
    { x: x + 1, y },
    { x, y: y - 1 },
    { x, y: y + 1 },
  ]

  for (const p of potential) {
    const idx = getIndex(board, p)
    if (idx !== -1) {
      neighbors.push(idx)
    }
  }

  return neighbors
}

export const serializeBoard = (board: Board): string => {
  return board.intersections
    .map((s) => (s === StoneColor.BLACK ? 'B' : s === StoneColor.WHITE ? 'W' : '.'))
    .join('')
}

import { StoneColor, TerritoryOwner } from '../types/index'
import type { Board, TerritoryMap } from '../types/index'

/**
 * Estimates territory based on strictly enclosed areas.
 * @param board The Go board state.
 * @returns An array representing estimated ownership ('BLACK', 'WHITE', or 'NONE').
 */
export function calculateTerritory(board: Board): TerritoryMap {
  const size = board.size
  const territoryMap: TerritoryMap = Array(size * size).fill(TerritoryOwner.NONE)
  const visited = new Set<number>()

  const getNeighbors = (index: number): number[] => {
    const neighbors: number[] = []
    const x = index % size
    const y = Math.floor(index / size)

    if (x > 0) neighbors.push(index - 1)
    if (x < size - 1) neighbors.push(index + 1)
    if (y > 0) neighbors.push(index - size)
    if (y < size - 1) neighbors.push(index + size)

    return neighbors
  }

  for (let i = 0; i < size * size; i++) {
    if (board.intersections[i] !== StoneColor.NONE || visited.has(i)) {
      continue
    }

    // New component found
    const component: number[] = []
    const queue: number[] = [i]
    visited.add(i)

    const neighborsColors = new Set<StoneColor>()

    while (queue.length > 0) {
      const current = queue.shift()!
      component.push(current)

      for (const neighbor of getNeighbors(current)) {
        const neighborColor = board.intersections[neighbor]
        if (neighborColor === StoneColor.NONE) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor)
            queue.push(neighbor)
          }
        } else {
          neighborsColors.add(neighborColor)
        }
      }
    }

    // Determine ownership
    let owner: TerritoryOwner = TerritoryOwner.NONE
    if (neighborsColors.size === 1) {
      const color = Array.from(neighborsColors)[0]
      if (color === StoneColor.BLACK) owner = TerritoryOwner.BLACK
      if (color === StoneColor.WHITE) owner = TerritoryOwner.WHITE
    }

    for (const pointIndex of component) {
      territoryMap[pointIndex] = owner
    }
  }

  return territoryMap
}

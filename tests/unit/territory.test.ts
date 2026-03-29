import { describe, it, expect } from 'vitest'
import { StoneColor } from '../../src/core/types'
import type { Board } from '../../src/core/types'
import { calculateTerritory } from '../../src/core/rules/territory'

describe('Territory Estimation', () => {
  const createBoard = (size: number, stones: { [key: number]: StoneColor } = {}): Board => {
    const intersections = Array(size * size).fill(StoneColor.NONE)
    Object.entries(stones).forEach(([index, color]) => {
      intersections[Number(index)] = color
    })
    return { size, intersections }
  }

  it('should return NONE for all points on an empty board', () => {
    const board = createBoard(9)
    const territory = calculateTerritory(board)
    expect(territory.every((owner) => owner === 'NONE')).toBe(true)
  })

  it('should identify territory strictly enclosed by Black', () => {
    // 3x3 board
    // X . .
    // . . .
    // . . .
    // Enclose corner (0,0) by placing black stones at (0,1) and (1,0)
    // Actually, (0,0) is at index 0. Neighbors are 1 and 3 (on a 3x3 board)
    const size = 3
    const board = createBoard(size, {
      1: StoneColor.BLACK,
      3: StoneColor.BLACK,
    })
    // 0 is enclosed by BLACK (1 and 3)
    // . X .
    // X . .
    // . . .
    // Index 0 neighbors: 1 (BLACK), 3 (BLACK)
    const territory = calculateTerritory(board)
    expect(territory[0]).toBe('BLACK')
  })

  it('should identify territory strictly enclosed by White', () => {
    const size = 3
    const board = createBoard(size, {
      1: StoneColor.WHITE,
      3: StoneColor.WHITE,
      4: StoneColor.WHITE, // (1,1)
    })
    // 0 is enclosed by WHITE (1 and 3)
    const territory = calculateTerritory(board)
    expect(territory[0]).toBe('WHITE')
  })

  it('should return NONE for area touching both colors', () => {
    const size = 3
    const board = createBoard(size, {
      1: StoneColor.BLACK,
      3: StoneColor.WHITE,
    })
    const territory = calculateTerritory(board)
    expect(territory[0]).toBe('NONE')
  })

  it('should handle complex enclosures', () => {
    // 5x5 board
    // . X . . .
    // X . X . .
    // . X . . .
    // . . . . .
    // . . . . .
    const size = 5
    const board = createBoard(size, {
      1: StoneColor.BLACK,
      5: StoneColor.BLACK,
      7: StoneColor.BLACK,
      11: StoneColor.BLACK,
    })
    // Index 6 (1,1) is enclosed by BLACK
    const territory = calculateTerritory(board)
    expect(territory[6]).toBe('BLACK')
    expect(territory[0]).toBe('BLACK') // Also enclosed by 1 and 5
  })

  it('should return NONE for points occupied by stones', () => {
    const size = 3
    const board = createBoard(size, {
      0: StoneColor.BLACK,
    })
    const territory = calculateTerritory(board)
    expect(territory[0]).toBe('NONE')
  })

  it('should perform quickly on 19x19 boards', () => {
    const size = 19
    const board = createBoard(size)
    const start = performance.now()
    calculateTerritory(board)
    const end = performance.now()
    expect(end - start).toBeLessThan(50)
  })
})

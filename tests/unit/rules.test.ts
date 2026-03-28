import { describe, it, expect } from 'vitest'
import { StoneColor } from '../../src/core/types'
import { createBoard } from '../../src/core/board/board'
import { getGroup } from '../../src/core/rules/liberties'
import { findCapturedGroups } from '../../src/core/rules/capture'
import { isSuicide } from '../../src/core/rules/suicide'
import { isKo } from '../../src/core/rules/ko'

describe('Rules: Group Detection & Liberties', () => {
  it('should find a single stone group and its liberties', () => {
    const board = createBoard(9)
    board.intersections[0] = StoneColor.BLACK // (0,0)

    const group = getGroup(board, 0)
    expect(group.color).toBe(StoneColor.BLACK)
    expect(group.stones).toEqual([0])
    expect(Array.from(group.liberties)).toEqual(expect.arrayContaining([1, 9]))
    expect(group.liberties.size).toBe(2)
  })

  it('should find a multi-stone group and its liberties', () => {
    const board = createBoard(9)
    board.intersections[0] = StoneColor.BLACK // (0,0)
    board.intersections[1] = StoneColor.BLACK // (1,0)

    const group = getGroup(board, 0)
    expect(group.stones).toEqual(expect.arrayContaining([0, 1]))
    expect(group.stones.length).toBe(2)
    expect(Array.from(group.liberties)).toEqual(expect.arrayContaining([9, 10, 2]))
    expect(group.liberties.size).toBe(3)
  })

  it('should not count stones of either color as liberties', () => {
    const board = createBoard(9)
    board.intersections[0] = StoneColor.BLACK // (0,0)
    board.intersections[1] = StoneColor.WHITE // (1,0)

    const group = getGroup(board, 0)
    expect(group.liberties.has(1)).toBe(false)
    expect(group.liberties.size).toBe(1)
  })
})

describe('Rules: Capture', () => {
  it('should identify a group with 0 liberties as captured', () => {
    const board = createBoard(9)
    board.intersections[0] = StoneColor.WHITE // (0,0)
    board.intersections[1] = StoneColor.BLACK // (1,0)
    board.intersections[9] = StoneColor.BLACK // (0,1)

    const captured = findCapturedGroups(board, StoneColor.BLACK)
    expect(captured).toHaveLength(1)
    expect(captured[0].stones).toEqual([0])
  })

  it('should not capture friendly stones', () => {
    const board = createBoard(9)
    board.intersections[0] = StoneColor.BLACK
    board.intersections[1] = StoneColor.BLACK
    board.intersections[9] = StoneColor.BLACK

    const captured = findCapturedGroups(board, StoneColor.BLACK)
    expect(captured).toHaveLength(0)
  })
})

describe('Rules: Suicide', () => {
  it('should identify a move with 0 liberties and no captures as suicide', () => {
    const board = createBoard(9)
    board.intersections[1] = StoneColor.WHITE
    board.intersections[9] = StoneColor.WHITE

    expect(isSuicide(board, 0, StoneColor.BLACK)).toBe(true)
  })

  it('should not identify a move that results in a capture as suicide', () => {
    const board = createBoard(9)
    board.intersections[0] = StoneColor.WHITE
    board.intersections[1] = StoneColor.BLACK
    // (0,1) is empty. (0,1) index is 9. Playing BLACK at index 9 will capture WHITE at 0.

    expect(isSuicide(board, 9, StoneColor.BLACK)).toBe(false)
  })
})

describe('Rules: Ko', () => {
  it('should identify a Ko violation', () => {
    const history = ['...B...W...']
    expect(isKo(history, '...B...W...')).toBe(true)
    expect(isKo(history, '...W...B...')).toBe(false)
  })
})

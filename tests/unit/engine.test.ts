import { describe, it, expect } from 'vitest'
import { createNewGame, placeStone, undoMove, passTurn } from '../../src/core/engine'
import { StoneColor } from '../../src/core/types'

describe('Engine: Basic Placement', () => {
  it('should initialize a new game with black turn', () => {
    const game = createNewGame(19)
    expect(game.turn).toBe(StoneColor.BLACK)
    expect(game.board.size).toBe(19)
    expect(game.board.intersections.every((s) => s === StoneColor.NONE)).toBe(true)
  })

  it('should place a black stone and switch turn to white', () => {
    const game = createNewGame(19)
    const result = placeStone(game, { x: 3, y: 3 })

    expect(result.success).toBe(true)
    expect(result.newState?.board.intersections[3 * 19 + 3]).toBe(StoneColor.BLACK)
    expect(result.newState?.turn).toBe(StoneColor.WHITE)
  })

  it('should switch turn back to black after white move', () => {
    const game = createNewGame(19)
    const res1 = placeStone(game, { x: 3, y: 3 })
    const res2 = placeStone(res1.newState!, { x: 15, y: 15 })

    expect(res2.newState?.turn).toBe(StoneColor.BLACK)
  })

  it('should not allow placing a stone on an occupied point', () => {
    const game = createNewGame(19)
    const res1 = placeStone(game, { x: 3, y: 3 })
    const res2 = placeStone(res1.newState!, { x: 3, y: 3 })

    expect(res2.success).toBe(false)
    expect(res2.error).toBe('POINT_NOT_EMPTY')
  })

  it('should undo the last move', () => {
    const game = createNewGame(19)
    const res1 = placeStone(game, { x: 3, y: 3 })
    const res2 = placeStone(res1.newState!, { x: 15, y: 15 })

    const undone = undoMove(res2.newState!)
    expect(undone.board.intersections[15 * 19 + 15]).toBe(StoneColor.NONE)
    expect(undone.board.intersections[3 * 19 + 3]).toBe(StoneColor.BLACK)
    expect(undone.turn).toBe(StoneColor.WHITE)
    expect(undone.history.length).toBe(1)
  })

  it('should switch turn when a player passes', () => {
    const game = createNewGame(19)
    const next = passTurn(game)
    expect(next.turn).toBe(StoneColor.WHITE)
    expect(next.passes).toBe(1)
  })

  it('should finish the game after two consecutive passes', () => {
    const game = createNewGame(19)
    const next1 = passTurn(game)
    const next2 = passTurn(next1)
    expect(next2.status).toBe('FINISHED')
    expect(next2.passes).toBe(2)
  })

  it('should reset passes count when a stone is placed', () => {
    const game = createNewGame(19)
    const next1 = passTurn(game)
    expect(next1.passes).toBe(1)
    const res = placeStone(next1, { x: 3, y: 3 })
    expect(res.newState?.passes).toBe(0)
  })
})

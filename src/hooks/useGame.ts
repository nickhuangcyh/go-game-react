import { useState, useCallback, useEffect } from 'react'
import {
  createNewGame,
  placeStone,
  undoMove as undoEngineMove,
  passTurn as passEngineTurn,
} from '../core/engine'
import { Point, GameState } from '../core/types'

export const useGame = (size: number = 19) => {
  const [gameState, setGameState] = useState<GameState>(() => createNewGame(size))

  // Reset game when size changes
  useEffect(() => {
    setGameState(createNewGame(size))
  }, [size])

  const handlePlaceStone = useCallback(
    (pos: Point) => {
      const result = placeStone(gameState, pos)
      if (result.success && result.newState) {
        setGameState(result.newState)
      } else if (result.error) {
        console.warn('Move rejected:', result.error)
      }
    },
    [gameState]
  )

  const undoMove = useCallback(() => {
    setGameState((prev) => undoEngineMove(prev))
  }, [])

  const passTurn = useCallback(() => {
    setGameState((prev) => passEngineTurn(prev))
  }, [])

  const restartGame = useCallback(() => {
    setGameState(createNewGame(size))
  }, [size])

  return {
    gameState,
    handlePlaceStone,
    undoMove,
    passTurn,
    restartGame,
  }
}

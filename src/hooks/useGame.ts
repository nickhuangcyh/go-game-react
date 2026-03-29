import { useState, useCallback, useMemo } from 'react'
import {
  createNewGame,
  placeStone,
  undoMove as undoEngineMove,
  passTurn as passEngineTurn,
} from '../core/engine'
import { calculateTerritory } from '../core/rules/territory'
import type { Point, GameState } from '../core/types/index'

export const useGame = (size: number = 19) => {
  const [gameState, setGameState] = useState<GameState>(() => createNewGame(size))
  const [isEstimating, setIsEstimating] = useState(false)

  // Adjust state if size changes (react pattern for resetting state on prop change)
  const [prevSize, setPrevSize] = useState(size)
  if (size !== prevSize) {
    setPrevSize(size)
    setGameState(createNewGame(size))
    setIsEstimating(false)
  }

  const territoryMap = useMemo(() => {
    if (isEstimating) {
      return calculateTerritory(gameState.board)
    }
    return null
  }, [isEstimating, gameState.board])

  const toggleTerritory = useCallback(() => {
    setIsEstimating((prev) => !prev)
  }, [])

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
    isEstimating,
    territoryMap,
    toggleTerritory,
  }
}

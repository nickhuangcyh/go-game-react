import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useGame } from '../../src/hooks/useGame'

describe('useGame Hook with Territory Estimation', () => {
  it('should toggle isEstimating state', () => {
    const { result } = renderHook(() => useGame(9))

    expect(result.current.isEstimating).toBe(false)
    expect(result.current.territoryMap).toBeNull()

    act(() => {
      result.current.toggleTerritory()
    })

    expect(result.current.isEstimating).toBe(true)
    // On an empty board, territoryMap should be all NONE
    expect(result.current.territoryMap).not.toBeNull()
    expect(result.current.territoryMap!.every((owner) => owner === 'NONE')).toBe(true)
  })

  it('should update territoryMap when a stone is placed', () => {
    const { result } = renderHook(() => useGame(9))

    act(() => {
      result.current.toggleTerritory()
    })

    // Enclose (0,0) with black stones
    act(() => {
      result.current.handlePlaceStone({ x: 1, y: 0 })
    })
    act(() => {
      // It's white's turn, so we need to place a white stone elsewhere or pass
      result.current.passTurn()
    })
    act(() => {
      result.current.handlePlaceStone({ x: 0, y: 1 })
    })

    // (0,0) index 0 should be BLACK territory
    expect(result.current.territoryMap![0]).toBe('BLACK')
  })
})

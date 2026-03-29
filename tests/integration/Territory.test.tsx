import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Board } from '../../src/components/Board/Board'
import { StoneColor, TerritoryOwner } from '../../src/core/types'
import { createBoard } from '../../src/core/board/board'

describe('Board Territory Markers', () => {
  it('should render territory markers when isEstimating is true', () => {
    const size = 9
    const board = createBoard(size)
    // Enclose (0,0) with BLACK
    board.intersections[1] = StoneColor.BLACK
    board.intersections[size] = StoneColor.BLACK

    const territoryMap = Array(size * size).fill(TerritoryOwner.NONE)
    territoryMap[0] = TerritoryOwner.BLACK

    render(
      <Board
        board={board}
        onPlaceStone={() => {}}
        lastMove={null}
        isEstimating={true}
        territoryMap={territoryMap}
      />
    )

    // Check for territory marker in the first intersection
    const intersections = screen.getAllByRole('button')
    const marker = intersections[0].querySelector('.territory-marker')
    expect(marker).toBeTruthy()
    expect(marker).toHaveClass('territory-black')
  })

  it('should NOT render territory markers when isEstimating is false', () => {
    const size = 9
    const board = createBoard(size)
    const territoryMap = Array(size * size).fill(TerritoryOwner.BLACK)

    render(
      <Board
        board={board}
        onPlaceStone={() => {}}
        lastMove={null}
        isEstimating={false}
        territoryMap={territoryMap}
      />
    )

    const marker = document.querySelector('.territory-marker')
    expect(marker).toBeNull()
  })
})

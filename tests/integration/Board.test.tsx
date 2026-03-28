import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Board } from '../../src/components/Board/Board'
import { StoneColor } from '../../src/core/types'
import { createBoard } from '../../src/core/board/board'

describe('Board Component', () => {
  it('should render correct number of intersections', () => {
    const size = 9
    const board = createBoard(size)
    render(<Board board={board} onPlaceStone={() => {}} lastMove={null} />)

    // Check if we have size*size elements representing intersections
    const intersections = screen.getAllByRole('button')
    expect(intersections).toHaveLength(size * size)
  })

  it('should call onPlaceStone when an intersection is clicked', () => {
    const size = 9
    const board = createBoard(size)
    const onPlaceStone = vi.fn()
    render(<Board board={board} onPlaceStone={onPlaceStone} lastMove={null} />)

    const intersections = screen.getAllByRole('button')
    fireEvent.click(intersections[0])

    expect(onPlaceStone).toHaveBeenCalledWith({ x: 0, y: 0 })
  })

  it('should render black and white stones', () => {
    const size = 9
    const board = createBoard(size)
    board.intersections[0] = StoneColor.BLACK
    board.intersections[1] = StoneColor.WHITE

    render(<Board board={board} onPlaceStone={() => {}} lastMove={null} />)

    const intersections = screen.getAllByRole('button')
    // We expect some visual indicator for black and white stones
    // For now let's assume we use data attributes or classes
    expect(intersections[0]).toHaveAttribute('data-color', StoneColor.BLACK)
    expect(intersections[1]).toHaveAttribute('data-color', StoneColor.WHITE)
    expect(intersections[2]).toHaveAttribute('data-color', StoneColor.NONE)
  })
})

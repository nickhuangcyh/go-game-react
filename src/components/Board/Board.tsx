import React from 'react'
import { Board as BoardType, StoneColor, Point } from '../../core/types'
import { getPoint } from '../../core/board/board'
import './Board.css'

interface BoardProps {
  board: BoardType
  onPlaceStone: (pos: Point) => void
  lastMove: number | null
}

export const Board: React.FC<BoardProps> = ({ board, onPlaceStone, lastMove }) => {
  return (
    <div
      className="board"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${board.size}, 1fr)`,
        gridTemplateRows: `repeat(${board.size}, 1fr)`,
        aspectRatio: '1 / 1',
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#DEB887', // BurlyWood (Go board color)
        position: 'relative',
        padding: '20px',
        boxSizing: 'border-box',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      }}
    >
      {/* Intersection background lines */}
      <div
        className="grid-lines"
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          right: '20px',
          bottom: '20px',
          display: 'grid',
          gridTemplateColumns: `repeat(${board.size - 1}, 1fr)`,
          gridTemplateRows: `repeat(${board.size - 1}, 1fr)`,
          pointerEvents: 'none',
        }}
      >
        {Array.from({ length: (board.size - 1) * (board.size - 1) }).map((_, i) => (
          <div key={i} style={{ border: '1px solid black' }} />
        ))}
      </div>

      {board.intersections.map((color, index) => {
        const point = getPoint(board, index)
        return (
          <button
            key={index}
            role="button"
            className={`intersection color-${color.toLowerCase()} ${index === lastMove ? 'last-move' : ''}`}
            data-color={color}
            onClick={() => onPlaceStone(point)}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '50%',
              padding: 0,
              cursor: color === StoneColor.NONE ? 'pointer' : 'default',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {color !== StoneColor.NONE && (
              <div
                className={`stone stone-${color.toLowerCase()}`}
                style={{
                  width: '90%',
                  height: '90%',
                  borderRadius: '50%',
                  margin: 'auto',
                  backgroundColor: color === StoneColor.BLACK ? 'black' : 'white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  border: color === StoneColor.WHITE ? '1px solid #ccc' : 'none',
                }}
              />
            )}
            {index === lastMove && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '30%',
                  height: '30%',
                  borderRadius: '50%',
                  backgroundColor: color === StoneColor.BLACK ? 'white' : 'black',
                  opacity: 0.6,
                }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}

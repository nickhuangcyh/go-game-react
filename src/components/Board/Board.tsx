import React from 'react'
import { StoneColor, TerritoryOwner } from '../../core/types/index'
import type { Board as BoardType, Point, TerritoryMap } from '../../core/types/index'
import { getPoint } from '../../core/board/board'
import './Board.css'

interface BoardProps {
  board: BoardType
  onPlaceStone: (pos: Point) => void
  lastMove: number | null
  territoryMap?: TerritoryMap | null
  isEstimating?: boolean
}

export const Board: React.FC<BoardProps> = ({
  board,
  onPlaceStone,
  lastMove,
  territoryMap,
  isEstimating,
}) => {
  // 計算半個格子的百分比，用於將網格線對齊按鈕中心
  const halfCellPercent = 100 / (2 * board.size)

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
        backgroundColor: '#DEB887', // 棋盤底色
        position: 'relative',
        padding: '20px',
        boxSizing: 'border-box',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
        borderRadius: '2px',
      }}
    >
      {/* 棋盤網格線：範圍從第一個交點中心到最後一個交點中心 */}
      <div
        className="grid-lines"
        style={{
          position: 'absolute',
          // 20px 是外層 padding，halfCellPercent 確保線條穿過按鈕中心
          top: `calc(20px + ${halfCellPercent}%)`,
          left: `calc(20px + ${halfCellPercent}%)`,
          right: `calc(20px + ${halfCellPercent}%)`,
          bottom: `calc(20px + ${halfCellPercent}%)`,
          display: 'grid',
          gridTemplateColumns: `repeat(${board.size - 1}, 1fr)`,
          gridTemplateRows: `repeat(${board.size - 1}, 1fr)`,
          pointerEvents: 'none',
          borderRight: '1px solid #333',
          borderBottom: '1px solid #333',
        }}
      >
        {Array.from({ length: (board.size - 1) * (board.size - 1) }).map((_, i) => (
          <div
            key={i}
            style={{
              borderTop: '1px solid #333',
              borderLeft: '1px solid #333',
            }}
          />
        ))}
      </div>

      {/* 棋子按鈕（交點） */}
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
              cursor: 'pointer',
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {color !== StoneColor.NONE && (
              <div
                className={`stone stone-${color.toLowerCase()}`}
                style={{
                  width: '92%',
                  height: '92%',
                  borderRadius: '50%',
                  backgroundColor: color === StoneColor.BLACK ? '#1a1a1a' : '#f0f0f0',
                  boxShadow:
                    color === StoneColor.BLACK
                      ? 'inset -2px -2px 5px rgba(0,0,0,0.5), 2px 2px 5px rgba(0,0,0,0.4)'
                      : 'inset -2px -2px 5px rgba(0,0,0,0.2), 2px 2px 5px rgba(0,0,0,0.3)',
                  border: color === StoneColor.WHITE ? '1px solid #d0d0d0' : 'none',
                }}
              />
            )}
            {/* 領地估算標記 */}
            {isEstimating &&
              territoryMap &&
              territoryMap[index] !== TerritoryOwner.NONE &&
              color === StoneColor.NONE && (
                <div
                  className={`territory-marker territory-${territoryMap[index].toLowerCase()}`}
                />
              )}
            {/* 最後一手標記 */}
            {index === lastMove && (
              <div
                style={{
                  position: 'absolute',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: color === StoneColor.BLACK ? '#fff' : '#000',
                  opacity: 0.7,
                  boxShadow: '0 0 2px rgba(0,0,0,0.5)',
                }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}

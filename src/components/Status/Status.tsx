import React from 'react'
import { StoneColor } from '../../core/types/index'

interface StatusProps {
  turn: StoneColor
  captures: { [key in StoneColor]?: number }
  status: 'PLAYING' | 'FINISHED'
}

export const Status: React.FC<StatusProps> = ({ turn, captures, status }) => {
  return (
    <div
      className="status-container"
      style={{
        textAlign: 'center',
        marginBottom: '20px',
        fontFamily: 'sans-serif',
        color: '#333', // 明確設定字體顏色為深灰色
      }}
    >
      <h2 style={{ color: '#333', margin: '0 0 10px 0' }}>
        {status === 'FINISHED' ? 'Game Over' : `Current Turn: ${turn}`}
      </h2>
      <div
        className="captures"
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          fontSize: '1.1rem',
          fontWeight: '500',
        }}
      >
        <div style={{ color: '#000' }}>Black Captures: {captures[StoneColor.BLACK]}</div>
        <div style={{ color: '#555' }}>White Captures: {captures[StoneColor.WHITE]}</div>
      </div>
    </div>
  )
}

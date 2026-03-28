import React from 'react'
import { StoneColor } from '../../core/types'

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
      }}
    >
      <h2>{status === 'FINISHED' ? 'Game Over' : `Current Turn: ${turn}`}</h2>
      <div className="captures" style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <div>Black Captures: {captures[StoneColor.BLACK]}</div>
        <div>White Captures: {captures[StoneColor.WHITE]}</div>
      </div>
    </div>
  )
}

import React from 'react'

interface ControlsProps {
  onUndo: () => void
  canUndo: boolean
  onRestart: () => void
  onPass: () => void
  isFinished: boolean
}

export const Controls: React.FC<ControlsProps> = ({
  onUndo,
  canUndo,
  onRestart,
  onPass,
  isFinished,
}) => {
  return (
    <div
      className="controls-container"
      style={{
        display: 'flex',
        gap: '10px',
        marginTop: '20px',
      }}
    >
      <button
        onClick={onPass}
        disabled={isFinished}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: isFinished ? 'not-allowed' : 'pointer',
          backgroundColor: isFinished ? '#e9ecef' : '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        Pass
      </button>
      <button
        onClick={onUndo}
        disabled={!canUndo}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: canUndo ? 'pointer' : 'not-allowed',
          backgroundColor: canUndo ? '#6c757d' : '#e9ecef',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        Undo
      </button>
      <button
        onClick={onRestart}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#4a3014',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        Restart
      </button>
    </div>
  )
}

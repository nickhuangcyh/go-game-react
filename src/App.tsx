import { useState } from 'react'
import { Board } from './components/Board/Board'
import { Status } from './components/Status/Status'
import { Controls } from './components/Controls/Controls'
import { useGame } from './hooks/useGame'
import './App.css'

function App() {
  const [boardSize, setBoardSize] = useState(19)
  const {
    gameState,
    handlePlaceStone,
    restartGame,
    undoMove,
    passTurn,
    isEstimating,
    territoryMap,
    toggleTerritory,
  } = useGame(boardSize)

  const changeBoardSize = (size: number) => {
    setBoardSize(size)
    // useGame already handles initialization with the new size because of the state initialization
    // But we need to make sure the hook resets when size changes.
    // Let's update useGame to use size in its dependency array.
  }

  return (
    <div
      className="app-container"
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <h1>Go Game Engine</h1>

      <div className="size-selector" style={{ marginBottom: '20px' }}>
        {[9, 13, 19].map((size) => (
          <button
            key={size}
            onClick={() => changeBoardSize(size)}
            style={{
              padding: '5px 15px',
              margin: '0 5px',
              cursor: 'pointer',
              backgroundColor: boardSize === size ? '#4a3014' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
            }}
          >
            {size}x{size}
          </button>
        ))}
      </div>

      <Status turn={gameState.turn} captures={gameState.captures} status={gameState.status} />

      <Board
        board={gameState.board}
        onPlaceStone={handlePlaceStone}
        lastMove={gameState.lastMove}
        territoryMap={territoryMap}
        isEstimating={isEstimating}
      />

      <Controls
        onUndo={undoMove}
        canUndo={gameState.history.length > 0}
        onRestart={restartGame}
        onPass={passTurn}
        onToggleTerritory={toggleTerritory}
        isEstimating={isEstimating}
        isFinished={gameState.status === 'FINISHED'}
      />
    </div>
  )
}

export default App

import { StoneColor } from './types/index'
import type { GameState, Point, MoveResult, Board } from './types/index'
import { createBoard, getIndex, setStone, serializeBoard } from './board/board'
import { findCapturedGroups, removeGroups } from './rules/capture'
import { getGroup } from './rules/liberties'
import { isSuicide } from './rules/suicide'
import { isKo } from './rules/ko'

export const createNewGame = (size: number): GameState => {
  return {
    board: createBoard(size),
    turn: StoneColor.BLACK,
    captures: {
      [StoneColor.BLACK]: 0,
      [StoneColor.WHITE]: 0,
    },
    history: [],
    lastMove: null,
    status: 'PLAYING',
    passes: 0,
  }
}

export const placeStone = (state: GameState, pos: Point): MoveResult => {
  if (state.status === 'FINISHED') return { success: false, error: 'GAME_FINISHED' }
  const index = getIndex(state.board, pos)

  if (state.board.intersections[index] !== StoneColor.NONE) {
    return { success: false, error: 'POINT_NOT_EMPTY' }
  }

  // Check Suicide (Pre-placement)
  if (isSuicide(state.board, index, state.turn)) {
    return { success: false, error: 'SUICIDE_MOVE' }
  }

  let nextBoard = setStone(state.board, pos, state.turn)
  const capturedGroups = findCapturedGroups(nextBoard, state.turn)

  const newCaptures: { [K in typeof StoneColor.BLACK | typeof StoneColor.WHITE]: number } = {
    ...state.captures,
  }
  if (capturedGroups.length > 0) {
    nextBoard = removeGroups(nextBoard, capturedGroups)
    const capturedCount = capturedGroups.reduce((acc, g) => acc + g.stones.length, 0)
    newCaptures[state.turn] += capturedCount
  }

  // Check Ko
  const nextSerialized = serializeBoard(nextBoard)
  if (isKo(state.history, nextSerialized)) {
    return { success: false, error: 'KO_VIOLATION' }
  }

  const newState: GameState = {
    ...state,
    board: nextBoard,
    turn: state.turn === StoneColor.BLACK ? StoneColor.WHITE : StoneColor.BLACK,
    captures: newCaptures,
    history: [...state.history, serializeBoard(state.board)],
    lastMove: index,
    passes: 0,
  }

  return { success: true, newState }
}

export const passTurn = (state: GameState): GameState => {
  if (state.status === 'FINISHED') return state

  const newPasses = state.passes + 1
  const isFinished = newPasses >= 2

  return {
    ...state,
    turn: state.turn === StoneColor.BLACK ? StoneColor.WHITE : StoneColor.BLACK,
    passes: newPasses,
    status: isFinished ? 'FINISHED' : 'PLAYING',
    lastMove: null,
    history: [...state.history, serializeBoard(state.board)],
  }
}

export const undoMove = (state: GameState): GameState => {
  if (state.history.length === 0) return state

  const prevSerialized = state.history[state.history.length - 1]
  const newHistory = state.history.slice(0, -1)

  // Reconstruct board from serialized string
  const intersections = prevSerialized.split('').map((char) => {
    if (char === 'B') return StoneColor.BLACK
    if (char === 'W') return StoneColor.WHITE
    return StoneColor.NONE
  })

  const newBoard: Board = {
    ...state.board,
    intersections,
  }

  return {
    ...state,
    board: newBoard,
    turn: state.turn === StoneColor.BLACK ? StoneColor.WHITE : StoneColor.BLACK,
    history: newHistory,
    lastMove: null,
    passes: 0,
    status: 'PLAYING', // Undo always brings back to playing status
  }
}

export const getLiberties = (state: GameState, pos: Point): number => {
  const index = getIndex(state.board, pos)
  if (index === -1 || state.board.intersections[index] === StoneColor.NONE) return 0
  const group = getGroup(state.board, index)
  return group.liberties.size
}

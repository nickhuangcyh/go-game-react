export const StoneColor = {
  BLACK: 'BLACK',
  WHITE: 'WHITE',
  NONE: 'NONE',
} as const

export type StoneColor = (typeof StoneColor)[keyof typeof StoneColor]

export const TerritoryOwner = {
  BLACK: 'BLACK',
  WHITE: 'WHITE',
  NONE: 'NONE',
} as const

export type TerritoryOwner = (typeof TerritoryOwner)[keyof typeof TerritoryOwner]

export type TerritoryMap = TerritoryOwner[]

export interface Point {
  x: number
  y: number
}

export interface Group {
  color: StoneColor
  stones: number[] // Indices in the 1D board array
  liberties: Set<number> // Indices of empty neighbors
}

export interface Board {
  size: number
  intersections: StoneColor[] // 1D array of length size * size
}

export interface GameState {
  board: Board
  turn: typeof StoneColor.BLACK | typeof StoneColor.WHITE
  captures: {
    [StoneColor.BLACK]: number
    [StoneColor.WHITE]: number
  }
  history: string[] // Serialized board states for Ko/Undo
  lastMove: number | null // Index of the last move
  status: 'PLAYING' | 'FINISHED'
  passes: number
}

export interface MoveResult {
  success: boolean
  newState?: GameState
  error?: string
}

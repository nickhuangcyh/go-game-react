# Quickstart: Go Game Engine

## Project Initialization
1. Ensure Node.js 18+ and npm are installed.
2. `npm install` to install dependencies (React, Vite, Vitest).
3. `npm run dev` to start the local development server.

## Running Tests (TDD)
1. `npm run test` to execute unit tests for the core engine.
2. `npm run test:watch` for continuous TDD during development.

## Core Engine Usage
The core logic resides in `src/core/`. You can interact with the engine using pure functions:

```typescript
import { createNewGame, placeStone } from './core/game';

// Initialize a 19x19 game
let gameState = createNewGame(19);

// Place a Black stone at (10, 10)
const result = placeStone(gameState, { x: 10, y: 10 });
if (result.success) {
  gameState = result.newState;
}
```

## Deployment
This project is configured for GitHub Pages.
- `npm run build` generates a static `dist` folder.
- Follow GitHub Pages documentation to point the deployment to the `dist` branch or folder.

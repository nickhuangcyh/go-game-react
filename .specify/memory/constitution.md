<!--
Sync Impact Report:
- Version change: N/A → 1.0.0
- Added Principles:
    - I. Absolute Separation of Core Logic and UI
    - II. Strict TypeScript Typing
    - III. Test-Driven Development (TDD)
    - IV. Predictable State Management
    - V. Domain-Driven Design (DDD)
- Added sections: Core Principles, Technology Stack & Quality, Governance
- Templates requiring updates:
    - .specify/templates/plan-template.md (✅ aligned)
    - .specify/templates/spec-template.md (✅ aligned)
    - .specify/templates/tasks-template.md (✅ aligned)
- Follow-up TODOs: None
-->

# go-game-react Constitution
<!-- Project Principles focused on strict Domain-Driven Design (DDD) -->

## Core Principles

### I. Absolute Separation of Core Logic and UI
Core game logic MUST be implemented as pure functions with zero dependencies on UI frameworks or DOM APIs. UI components (React) MUST only be responsible for rendering state and dispatching actions. This ensures the game engine is portable and independently testable.

### II. Strict TypeScript Typing
All domain entities (Board, Stone, Group, Position) MUST have explicit interfaces or types. The `any` type is strictly forbidden. Use exhaustive type checking and strict null checks to ensure type safety across the entire codebase.

### III. Test-Driven Development (TDD)
All algorithmic logic, especially complex graph traversals (liberties, capture detection, ko, suicide rules), MUST be developed using a TDD approach. Tests MUST be written and fail before any implementation begins. Red-Green-Refactor cycle is mandatory for core logic.

### IV. Predictable State Management
State management MUST follow a predictable, non-mutating pattern. Mutation of domain objects is strictly prohibited. Use functional updates to produce new state versions, ensuring time-travel debugging and easy state serialization.

### V. Domain-Driven Design (DDD)
The project MUST adhere to strict DDD principles. Domain logic MUST be isolated in a dedicated domain layer, independent of infrastructure (persistence) or UI concerns. Use Ubiquitous Language (e.g., "Liberties", "Atari", "Seki") consistently in code and documentation.

## Technology Stack & Quality
Focus on high-performance graph algorithms for Go game logic. React with Vanilla CSS for the UI layer. Mandatory unit testing for all core logic with 100% coverage goal for the domain layer.

## Governance
This Constitution supersedes all other practices and documentation. All Pull Requests MUST be reviewed for compliance with these principles. Amendments require a version bump and updated rationale.

**Version**: 1.0.0 | **Ratified**: 2026-03-28 | **Last Amended**: 2026-03-28

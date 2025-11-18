# Cypress E2E Testing

This directory contains end-to-end tests for the Pokemon Browser application using Cypress.

## Running Tests

### Open Cypress Test Runner (Interactive Mode)
```bash
npm run cypress:open
# or
npm run e2e:open
```

This opens the Cypress Test Runner where you can:
- See all test files
- Run tests in interactive mode
- Watch tests execute in real-time
- Debug tests with time-travel

### Run Tests Headless (CI/CD)
```bash
npm run cypress:run
# or
npm run e2e
```

### Run Tests in Headed Mode (Browser Visible)
```bash
npm run cypress:run:headed
```

## Test Structure

- `cypress/e2e/` - End-to-end test files
  - `pokemon-list.cy.ts` - Tests for Pokemon list pages (paginated and infinite scroll)
  - `pokemon-detail.cy.ts` - Tests for Pokemon detail page
  - `navigation.cy.ts` - Tests for navigation between pages

- `cypress/support/` - Support files and custom commands
  - `e2e.ts` - Global setup for e2e tests
  - `commands.ts` - Custom Cypress commands

- `cypress/fixtures/` - Test data fixtures

## Prerequisites

Before running Cypress tests, make sure your development server is running:

```bash
npm run dev
```

The tests are configured to run against `http://localhost:5173` (default Vite dev server port).

## Writing Tests

### Custom Commands

We have custom commands available:
- `cy.waitForPokemonList()` - Waits for Pokemon list to load
- `cy.waitForPokemonDetail()` - Waits for Pokemon detail page to load

### Example Test

```typescript
describe('My Feature', () => {
  it('should do something', () => {
    cy.visit('/pokemon/paginated')
    cy.waitForPokemonList()
    cy.get('[data-testid="pokemon-card"]').should('have.length.greaterThan', 0)
  })
})
```

## Configuration

Cypress configuration is in `cypress.config.ts` at the root of the project.


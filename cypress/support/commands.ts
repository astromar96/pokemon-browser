/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to wait for Pokemon list to load
       * @example cy.waitForPokemonList()
       */
      waitForPokemonList(): Chainable<void>
      
      /**
       * Custom command to wait for Pokemon detail to load
       * @example cy.waitForPokemonDetail()
       */
      waitForPokemonDetail(): Chainable<void>
    }
  }
}

Cypress.Commands.add('waitForPokemonList', () => {
  cy.get('[data-testid="pokemon-card"], [data-testid="pokemon-card-skeleton"]', { timeout: 10000 }).should('exist')
  // Wait for skeletons to disappear
  cy.get('[data-testid="pokemon-card-skeleton"]').should('not.exist')
})

Cypress.Commands.add('waitForPokemonDetail', () => {
  cy.get('[data-testid="pokemon-detail"]', { timeout: 10000 }).should('exist')
  cy.get('[data-testid="pokemon-detail-skeleton"]').should('not.exist')
})

export {}


import { stubPokemonListByOffset } from '../support/api-stubs'

describe('Navigation', () => {
  beforeEach(() => {
    stubPokemonListByOffset()
  })

  it('switches between paginated and infinite views using the layout controls', () => {
    cy.visit('/')
    cy.wait('@pokemonList')
    cy.waitForPokemonList()

    cy.url().should('include', '/pokemon/paginated')
    cy.contains('button', 'Page Controls').should('have.class', 'bg-primary')
    cy.contains('button', 'Infinite Scroll').should('have.class', 'border')

    cy.contains('button', 'Infinite Scroll').click()
    cy.wait('@pokemonList')
    cy.waitForPokemonList()
    cy.url({ timeout: 10000 }).should('include', '/pokemon/infinite')
    cy.contains('button', 'Infinite Scroll').should('have.class', 'bg-primary')
    cy.contains('button', 'Page Controls').should('have.class', 'border')

    cy.contains('button', 'Page Controls').click()
    cy.wait('@pokemonList')
    cy.waitForPokemonList()
    cy.url({ timeout: 10000 }).should('include', '/pokemon/paginated')
    cy.contains('button', 'Page Controls').should('have.class', 'bg-primary')
    cy.contains('button', 'Infinite Scroll').should('have.class', 'border')
  })

  it('handles direct navigation to a Pokemon detail page', () => {
    cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/1*', {
      fixture: 'pokemon-1.json',
      delay: 300,
    }).as('pokemonDetail')

    cy.visit('/pokemon/1')
    cy.wait('@pokemonDetail')
    cy.waitForPokemonDetail()

    cy.contains(/bulbasaur/i).should('exist')
  })
})

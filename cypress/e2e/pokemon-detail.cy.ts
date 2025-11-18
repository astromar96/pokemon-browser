import {
  stubPokemonDetail,
  stubPokemonNotFound,
  stubPokemonListByOffset,
} from '../support/api-stubs'

describe('Pokemon Detail Page', () => {
  beforeEach(() => {
    stubPokemonListByOffset()
    stubPokemonDetail(1, 'pokemon-1.json')
    stubPokemonDetail(25, 'pokemon-25.json')
  })

  it('navigates from the list to a detail page', () => {
    cy.visit('/pokemon/paginated')
    cy.wait('@pokemonList')
    cy.waitForPokemonList()

    cy.get('[data-testid="pokemon-card"]').first().click()

    cy.wait('@pokemonDetail')
    cy.waitForPokemonDetail()

    cy.contains('h1', /bulbasaur/i).should('exist')
    cy.contains('#001').should('exist')
    cy.contains('Grass', { matchCase: false }).should('exist')
    cy.contains('Poison', { matchCase: false }).should('exist')
    cy.contains('Height').should('exist')
    cy.contains('Weight').should('exist')
    cy.contains('Base Stats').should('exist')
  })

  it('renders Pikachu details and allows returning to the paginated list', () => {
    cy.visit('/pokemon/25')
    cy.wait('@pokemonDetail')
    cy.waitForPokemonDetail()

    cy.contains('h1', /pikachu/i).should('exist')
    cy.contains('#025').should('exist')
    cy.get('img[alt*="pikachu" i]').should('be.visible')
    cy.contains('Electric').should('exist')
    cy.contains('Height').should('exist')
    cy.contains('0.4 m').should('exist')
    cy.contains('6 kg').should('exist')
    cy.contains('Base Experience').should('exist')
    cy.contains('112 XP').should('exist')
    cy.contains('Abilities').should('exist')
    cy.contains('static', { matchCase: false }).should('exist')
    cy.contains('lightning-rod', { matchCase: false }).should('exist')
    cy.contains('(Hidden)').should('exist')

    cy.contains('button', 'Back to List', { matchCase: false }).click()
    cy.wait('@pokemonList')
    cy.waitForPokemonList()
    cy.url().should('include', '/pokemon/paginated')
  })

  it('handles invalid Pokemon IDs gracefully', () => {
    stubPokemonNotFound(99999)
    cy.visit('/pokemon/99999')
    cy.wait('@pokemonNotFound')

    cy.contains(/error loading pokemon details/i, { timeout: 15000 }).should('exist')
  })
})

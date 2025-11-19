import { stubPokemonListByOffset } from '../support/api-stubs'

describe('Pokemon List Pages', () => {
  beforeEach(() => {
    stubPokemonListByOffset()
  })

  it('redirects to paginated view by default and shows layout actions', () => {
    cy.visit('/')
    cy.wait('@pokemonList')
    cy.waitForPokemonList()

    cy.url().should('include', '/pokemon/paginated')
    cy.contains('Pokedex').should('be.visible')
    cy.contains('discover and explore pokemon with page controls', { matchCase: false }).should('be.visible')

    cy.contains('button', 'Page Controls').should('have.class', 'bg-primary')
    cy.contains('button', 'Infinite Scroll').should('have.class', 'border')
  })

  it('displays paginated grid with cards, controls, and pagination info', () => {
    cy.visit('/pokemon/paginated')
    cy.wait('@pokemonList')
    cy.waitForPokemonList()

    cy.get('[data-testid="pokemon-card"]').should('have.length', 10)
    cy.get('[data-testid="pokemon-name"]').first().should('contain.text', 'bulbasaur')
    cy.contains('button', 'Previous').should('be.disabled')
    cy.contains('button', 'Next').should('not.be.disabled')
    cy.contains('Page 1 of 131 (10 Pokemon shown)').should('exist')
  })

  it('navigates through pagination controls and keeps state in the URL', () => {
    cy.visit('/pokemon/paginated')
    cy.wait('@pokemonList')
    cy.waitForPokemonList()

    cy.contains('button', 'Next').click()
    cy.wait('@pokemonList').then((interception) => {
      const url = new URL(interception.request.url)
      expect(url.searchParams.get('offset')).to.equal('10')
    })
    cy.waitForPokemonList()

    cy.get('[data-testid="pokemon-name"]').first().should('contain.text', 'metapod')
    cy.url().should('include', 'page=2')
    cy.contains('Page 2 of 131 (10 Pokemon shown)').should('exist')
    cy.contains('button', 'Previous').should('not.be.disabled')

    cy.contains('button', 'Previous').click()
    cy.wait('@pokemonList')
    cy.waitForPokemonList()
    cy.url().should('not.include', 'page=')
    cy.contains('Page 1 of 131 (10 Pokemon shown)').should('exist')
  })

  it('loads more Pokemon using Load More button and exposes scroll-to-top', () => {
    cy.visit('/pokemon/infinite')
    cy.wait('@pokemonList')
    cy.waitForPokemonList()

    cy.contains('button', 'Infinite Scroll').should('have.class', 'bg-primary')
    cy.contains('button', 'Page Controls').should('have.class', 'border')
    cy.contains('Showing 10 of 1302 Pokemon').should('exist')

    cy.get('[data-testid="pokemon-card"]').its('length').then((initialCount) => {
      expect(initialCount).to.be.greaterThan(0)
      cy.get('button[aria-label="Scroll to top"]').should('not.exist')

      // Verify Load More button is visible and enabled
      cy.get('[data-testid="load-more-button"]').should('be.visible').and('not.be.disabled')
      cy.get('[data-testid="load-more-button"]').should('contain.text', 'Load More')

      // Click Load More button
      cy.get('[data-testid="load-more-button"]').click()

      // Verify button is disabled while loading
      cy.get('[data-testid="load-more-button"]').should('be.disabled')
      cy.get('[data-testid="load-more-button"]').should('contain.text', 'Loading...')

      cy.wait('@pokemonList').then((interception) => {
        const url = new URL(interception.request.url)
        expect(url.searchParams.get('offset')).to.equal('10')
      })
      cy.waitForPokemonList()

      cy.get('[data-testid="pokemon-card"]').should('have.length.greaterThan', initialCount)
      cy.contains('Showing 20 of 1302 Pokemon').should('exist')

      // Verify button is enabled again after loading
      cy.get('[data-testid="load-more-button"]').should('not.be.disabled')
      cy.get('[data-testid="load-more-button"]').should('contain.text', 'Load More')

      // Force scroll event to show scroll-to-top control
      cy.window().then((win) => {
        win.scrollTo(0, 500)
        win.dispatchEvent(new Event('scroll'))
      })

      cy.get('button[aria-label="Scroll to top"]', { timeout: 5000 }).should('be.visible')

      cy.window().then((win) => {
        cy.stub(win, 'scrollTo').as('windowScrollTo')
      })
      cy.get('button[aria-label="Scroll to top"]').click()
      cy.get('@windowScrollTo').should('have.been.calledWithMatch', { top: 0, behavior: 'smooth' })
    })
  })
})

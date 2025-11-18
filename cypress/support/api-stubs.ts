/// <reference types="cypress" />

/**
 * Helper functions to stub Pokemon API requests
 */

export function stubPokemonList(page: number = 1, fixture: string = 'pokemon-list-page1.json') {
  const offset = (page - 1) * 10
  cy.intercept(
    {
      method: 'GET',
      url: 'https://pokeapi.co/api/v2/pokemon*',
      query: {
        limit: '10',
        offset: offset.toString(),
      },
    },
    {
      fixture,
      delay: 500, // Simulate network delay
    }
  ).as(`pokemonListPage${page}`)
}

export function stubPokemonListWithParams(limit: number = 10, offset: number = 0, fixture: string = 'pokemon-list-page1.json') {
  cy.intercept(
    {
      method: 'GET',
      url: 'https://pokeapi.co/api/v2/pokemon*',
      query: {
        limit: limit.toString(),
        offset: offset.toString(),
      },
    },
    {
      fixture,
      delay: 500,
    }
  ).as(`pokemonList_${limit}_${offset}`)
}

type PokemonListFixtureMap = Record<number, string>

const DEFAULT_POKEMON_LIST_FIXTURES: PokemonListFixtureMap = {
  0: 'pokemon-list-page1.json',
  10: 'pokemon-list-page2.json',
}

interface StubPokemonListByOffsetOptions {
  fixtures?: PokemonListFixtureMap
  fallbackFixture?: string
  delay?: number
}

export function stubPokemonListByOffset(options?: StubPokemonListByOffsetOptions) {
  const fixtureMap = options?.fixtures ?? DEFAULT_POKEMON_LIST_FIXTURES
  const fallbackFixture = options?.fallbackFixture ?? DEFAULT_POKEMON_LIST_FIXTURES[0]
  const delay = options?.delay ?? 500

  cy.intercept(
    {
      method: 'GET',
      url: 'https://pokeapi.co/api/v2/pokemon*',
    },
    (req) => {
      const url = new URL(req.url)
      const offset = parseInt(url.searchParams.get('offset') || '0', 10)
      const fixture = fixtureMap[offset] ?? fallbackFixture
      req.reply({
        fixture,
        delay,
      })
    }
  ).as('pokemonList')
}

// Stub all Pokemon list requests with a default response
export function stubAllPokemonListRequests(fixture: string = 'pokemon-list-page1.json') {
  cy.intercept(
    {
      method: 'GET',
      url: 'https://pokeapi.co/api/v2/pokemon*',
    },
    {
      fixture,
      delay: 500,
    }
  ).as('pokemonList')
}

export function stubPokemonDetail(id: string | number, fixture: string = `pokemon-${id}.json`) {
  cy.intercept(
    {
      method: 'GET',
      url: `https://pokeapi.co/api/v2/pokemon/${id}*`,
    },
    {
      fixture,
      delay: 300,
    }
  ).as('pokemonDetail')
}

export function stubPokemonListInfinite(limit: number = 10) {
  // Stub first page
  cy.intercept(
    {
      method: 'GET',
      url: 'https://pokeapi.co/api/v2/pokemon*',
      query: {
        limit: limit.toString(),
        offset: '0',
      },
    },
    {
      fixture: 'pokemon-list-page1.json',
      delay: 500,
    }
  ).as('pokemonListPage1')

  // Stub second page for infinite scroll
  cy.intercept(
    {
      method: 'GET',
      url: 'https://pokeapi.co/api/v2/pokemon*',
      query: {
        limit: limit.toString(),
        offset: limit.toString(),
      },
    },
    {
      fixture: 'pokemon-list-page2.json',
      delay: 500,
    }
  ).as('pokemonListPage2')
}

export function stubPokemonNotFound(id: string | number) {
  cy.intercept(
    {
      method: 'GET',
      url: `https://pokeapi.co/api/v2/pokemon/${id}*`,
    },
    {
      statusCode: 404,
      body: {
        detail: 'Not found.',
      },
      delay: 300,
    }
  ).as('pokemonNotFound')
}

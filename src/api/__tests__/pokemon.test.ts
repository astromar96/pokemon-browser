import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetchPokemonList, fetchPokemon, type Pokemon, type PokemonListResponse } from '../pokemon'

describe('fetchPokemonList', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('should fetch Pokemon list with default params', async () => {
    const mockResponse: PokemonListResponse = {
      count: 1000,
      next: 'https://pokeapi.co/api/v2/pokemon?offset=10&limit=10',
      previous: null,
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      ],
    }

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    }))

    const promise = fetchPokemonList()
    vi.advanceTimersByTime(1000)
    const result = await promise

    expect(result).toEqual(mockResponse)
    expect(globalThis.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0')
  })

  it('should fetch Pokemon list with custom params', async () => {
    const mockResponse: PokemonListResponse = {
      count: 1000,
      next: null,
      previous: null,
      results: [
        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
      ],
    }

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    }))

    const promise = fetchPokemonList({ limit: 1, offset: 24 })
    vi.advanceTimersByTime(1000)
    const result = await promise

    expect(result).toEqual(mockResponse)
    expect(globalThis.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?limit=1&offset=24')
  })

  it('should throw error when fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      statusText: 'Not Found',
    }))

    const promise = fetchPokemonList()
    vi.advanceTimersByTime(1000)

    await expect(promise).rejects.toThrow('Failed to fetch Pokemon list: Not Found')
  })
})

describe('fetchPokemon', () => {
  it('should fetch a single Pokemon by ID', async () => {
    const mockPokemon: Pokemon = {
      id: 25,
      name: 'pikachu',
      base_experience: 112,
      height: 4,
      weight: 60,
      sprites: {
        front_default: 'https://example.com/pikachu.png',
        front_shiny: null,
        back_default: null,
        back_shiny: null,
        other: {
          'official-artwork': {
            front_default: 'https://example.com/pikachu-artwork.png',
          },
        },
      },
      types: [
        {
          slot: 1,
          type: {
            name: 'electric',
            url: 'https://pokeapi.co/api/v2/type/13/',
          },
        },
      ],
      stats: [
        {
          base_stat: 35,
          effort: 0,
          stat: {
            name: 'hp',
            url: 'https://pokeapi.co/api/v2/stat/1/',
          },
        },
      ],
      abilities: [
        {
          ability: {
            name: 'static',
            url: 'https://pokeapi.co/api/v2/ability/9/',
          },
          is_hidden: false,
          slot: 1,
        },
      ],
    }

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockPokemon,
    }))

    const result = await fetchPokemon(25)

    expect(result).toEqual(mockPokemon)
    expect(globalThis.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/25')
  })

  it('should fetch a single Pokemon by string ID', async () => {
    const mockPokemon: Pokemon = {
      id: 1,
      name: 'bulbasaur',
      base_experience: 64,
      height: 7,
      weight: 69,
      sprites: {
        front_default: null,
        front_shiny: null,
        back_default: null,
        back_shiny: null,
        other: {
          'official-artwork': {
            front_default: null,
          },
        },
      },
      types: [],
      stats: [],
      abilities: [],
    }

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockPokemon,
    }))

    const result = await fetchPokemon('1')

    expect(result).toEqual(mockPokemon)
    expect(globalThis.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/1')
  })

  it('should throw error when fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      statusText: 'Not Found',
    }))

    await expect(fetchPokemon(99999)).rejects.toThrow('Failed to fetch Pokemon: Not Found')
  })
})


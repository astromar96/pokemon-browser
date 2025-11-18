import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { usePokemon, usePokemonList, usePokemonInfiniteList } from '../usePokemon'
import { fetchPokemon, fetchPokemonList, type Pokemon, type PokemonListResponse } from '../pokemon'

// Mock the API functions
vi.mock('../pokemon', () => ({
  fetchPokemon: vi.fn(),
  fetchPokemonList: vi.fn(),
}))

describe('usePokemon', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          gcTime: 0,
        },
      },
    })
    vi.clearAllMocks()
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  it('should fetch a single Pokemon', async () => {
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
      types: [],
      stats: [],
      abilities: [],
    }

    vi.mocked(fetchPokemon).mockResolvedValue(mockPokemon)

    const { result } = renderHook(() => usePokemon(25), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual(mockPokemon)
    expect(fetchPokemon).toHaveBeenCalledWith(25)
  })

  it('should not fetch when id is falsy', () => {
    const { result } = renderHook(() => usePokemon(''), { wrapper })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.isFetching).toBe(false)
    expect(fetchPokemon).not.toHaveBeenCalled()
  })
})

describe('usePokemonList', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          gcTime: 0,
        },
      },
    })
    vi.clearAllMocks()
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  it('should fetch Pokemon list with default params', async () => {
    const mockResponse: PokemonListResponse = {
      count: 1000,
      next: null,
      previous: null,
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      ],
    }

    vi.mocked(fetchPokemonList).mockResolvedValue(mockResponse)

    const { result } = renderHook(() => usePokemonList(), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual(mockResponse)
    expect(fetchPokemonList).toHaveBeenCalledWith(undefined)
  })

  it('should fetch Pokemon list with custom params', async () => {
    const mockResponse: PokemonListResponse = {
      count: 1000,
      next: null,
      previous: null,
      results: [{ name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }],
    }

    vi.mocked(fetchPokemonList).mockResolvedValue(mockResponse)

    const { result } = renderHook(() => usePokemonList({ limit: 1, offset: 24 }), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual(mockResponse)
    expect(fetchPokemonList).toHaveBeenCalledWith({ limit: 1, offset: 24 })
  })
})

describe('usePokemonInfiniteList', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          gcTime: 0,
        },
      },
    })
    vi.clearAllMocks()
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  it('should fetch infinite Pokemon list', async () => {
    const mockResponse1: PokemonListResponse = {
      count: 1000,
      next: 'https://pokeapi.co/api/v2/pokemon?offset=10&limit=10',
      previous: null,
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      ],
    }

    vi.mocked(fetchPokemonList).mockResolvedValue(mockResponse1)

    const { result } = renderHook(() => usePokemonInfiniteList(10), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data?.pages).toHaveLength(1)
    expect(result.current.data?.pages[0]).toEqual(mockResponse1)
    expect(fetchPokemonList).toHaveBeenCalledWith({ limit: 10, offset: 0 })
  })

  it('should calculate next page param correctly', async () => {
    const mockResponse: PokemonListResponse = {
      count: 1000,
      next: 'https://pokeapi.co/api/v2/pokemon?offset=10&limit=10',
      previous: null,
      results: [],
    }

    vi.mocked(fetchPokemonList).mockResolvedValue(mockResponse)

    const { result } = renderHook(() => usePokemonInfiniteList(10), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.hasNextPage).toBe(true)
    expect(result.current.data?.pages[0].next).toBe(mockResponse.next)
  })

  it('should handle no next page', async () => {
    const mockResponse: PokemonListResponse = {
      count: 1000,
      next: null,
      previous: null,
      results: [],
    }

    vi.mocked(fetchPokemonList).mockResolvedValue(mockResponse)

    const { result } = renderHook(() => usePokemonInfiniteList(10), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.hasNextPage).toBe(false)
  })
})


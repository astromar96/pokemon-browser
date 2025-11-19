import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithQueryClient } from '@/test/test-utils'
import PokemonInfinite from '../PokemonInfinite'
import { usePokemonInfiniteList } from '@/api/usePokemon'
import type { PokemonListResponse } from '@/api/pokemon'

// Mock the usePokemonInfiniteList hook
vi.mock('@/api/usePokemon', () => ({
  usePokemonInfiniteList: vi.fn(),
}))

// Mock PokemonCard to avoid rendering complexity
vi.mock('@/components/shared/PokemonCard', () => ({
  PokemonCard: ({ pokemonItem }: { pokemonItem: { name: string } }) => (
    <div data-testid="pokemon-card">{pokemonItem.name}</div>
  ),
}))

// Mock PokemonCardSkeleton
vi.mock('@/components/shared/PokemonCardSkeleton', () => ({
  PokemonCardSkeleton: () => <div data-testid="pokemon-card-skeleton">Loading...</div>,
}))

const mockUsePokemonInfiniteList = vi.mocked(usePokemonInfiniteList)

describe('PokemonInfinite', () => {
  const mockFetchNextPage = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    mockFetchNextPage.mockClear()
  })

  const createMockResponse = (
    results: Array<{ name: string; url: string }>,
    next: string | null = null
  ): PokemonListResponse => ({
    count: 1302,
    next,
    previous: null,
    results,
  })

  it('renders initial Pokemon list', async () => {
    const mockResponse = createMockResponse([
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    ])

    mockUsePokemonInfiniteList.mockReturnValue({
      data: {
        pages: [mockResponse],
        pageParams: [0],
      },
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: false,
      isLoading: false,
      isError: false,
      error: null,
    } as any)

    renderWithQueryClient(<PokemonInfinite />)

    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument()
      expect(screen.getByText('ivysaur')).toBeInTheDocument()
    })

    expect(screen.getByText('Showing 2 of 1302 Pokemon')).toBeInTheDocument()
  })

  it('shows Load More button when hasNextPage is true', async () => {
    const mockResponse = createMockResponse(
      [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }],
      'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20'
    )

    mockUsePokemonInfiniteList.mockReturnValue({
      data: {
        pages: [mockResponse],
        pageParams: [0],
      },
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: false,
      isLoading: false,
      isError: false,
      error: null,
    } as any)

    renderWithQueryClient(<PokemonInfinite />)

    await waitFor(() => {
      expect(screen.getByTestId('load-more-button')).toBeInTheDocument()
      expect(screen.getByTestId('load-more-button')).toHaveTextContent('Load More')
    })
  })

  it('hides Load More button when hasNextPage is false', async () => {
    const mockResponse = createMockResponse([
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    ])

    mockUsePokemonInfiniteList.mockReturnValue({
      data: {
        pages: [mockResponse],
        pageParams: [0],
      },
      fetchNextPage: mockFetchNextPage,
      hasNextPage: false,
      isFetchingNextPage: false,
      isLoading: false,
      isError: false,
      error: null,
    } as any)

    renderWithQueryClient(<PokemonInfinite />)

    await waitFor(() => {
      expect(screen.queryByTestId('load-more-button')).not.toBeInTheDocument()
    })
  })

  it('disables Load More button when isFetchingNextPage is true', async () => {
    const mockResponse = createMockResponse(
      [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }],
      'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20'
    )

    mockUsePokemonInfiniteList.mockReturnValue({
      data: {
        pages: [mockResponse],
        pageParams: [0],
      },
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: true,
      isLoading: false,
      isError: false,
      error: null,
    } as any)

    renderWithQueryClient(<PokemonInfinite />)

    await waitFor(() => {
      const button = screen.getByTestId('load-more-button')
      expect(button).toBeDisabled()
      expect(button).toHaveTextContent('Loading...')
    })
  })

  it('calls fetchNextPage when Load More button is clicked', async () => {
    const user = userEvent.setup()
    const mockResponse = createMockResponse(
      [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }],
      'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20'
    )

    mockUsePokemonInfiniteList.mockReturnValue({
      data: {
        pages: [mockResponse],
        pageParams: [0],
      },
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: false,
      isLoading: false,
      isError: false,
      error: null,
    } as any)

    renderWithQueryClient(<PokemonInfinite />)

    await waitFor(() => {
      expect(screen.getByTestId('load-more-button')).toBeInTheDocument()
    })

    const button = screen.getByTestId('load-more-button')
    await user.click(button)

    expect(mockFetchNextPage).toHaveBeenCalledTimes(1)
  })

  it('shows loading skeletons when isFetchingNextPage is true', async () => {
    const mockResponse = createMockResponse(
      [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }],
      'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20'
    )

    mockUsePokemonInfiniteList.mockReturnValue({
      data: {
        pages: [mockResponse],
        pageParams: [0],
      },
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: true,
      isLoading: false,
      isError: false,
      error: null,
    } as any)

    renderWithQueryClient(<PokemonInfinite />)

    await waitFor(() => {
      const skeletons = screen.getAllByTestId('pokemon-card-skeleton')
      expect(skeletons.length).toBeGreaterThan(0)
    })
  })

  it('shows end message when all Pokemon are loaded', async () => {
    const mockResponse = createMockResponse([
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    ])

    mockUsePokemonInfiniteList.mockReturnValue({
      data: {
        pages: [mockResponse],
        pageParams: [0],
      },
      fetchNextPage: mockFetchNextPage,
      hasNextPage: false,
      isFetchingNextPage: false,
      isLoading: false,
      isError: false,
      error: null,
    } as any)

    renderWithQueryClient(<PokemonInfinite />)

    await waitFor(() => {
      expect(
        screen.getByText("You've reached the end! All 1302 Pokemon have been loaded.")
      ).toBeInTheDocument()
    })
  })

  it('handles error state correctly', async () => {
    const mockError = new Error('Failed to fetch Pokemon')

    mockUsePokemonInfiniteList.mockReturnValue({
      data: undefined,
      fetchNextPage: mockFetchNextPage,
      hasNextPage: false,
      isFetchingNextPage: false,
      isLoading: false,
      isError: true,
      error: mockError,
    } as any)

    renderWithQueryClient(<PokemonInfinite />)

    await waitFor(() => {
      expect(screen.getByText(/Error loading Pokemon:/)).toBeInTheDocument()
      expect(screen.getByText(/Failed to fetch Pokemon/)).toBeInTheDocument()
      expect(screen.getByText('Retry')).toBeInTheDocument()
    })
  })

  it('shows loading skeletons when isLoading is true', async () => {
    mockUsePokemonInfiniteList.mockReturnValue({
      data: undefined,
      fetchNextPage: mockFetchNextPage,
      hasNextPage: false,
      isFetchingNextPage: false,
      isLoading: true,
      isError: false,
      error: null,
    } as any)

    renderWithQueryClient(<PokemonInfinite />)

    await waitFor(() => {
      const skeletons = screen.getAllByTestId('pokemon-card-skeleton')
      expect(skeletons.length).toBe(20) // ITEMS_PER_PAGE
    })
  })
})


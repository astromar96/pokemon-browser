import { useQuery, useInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query'
import { fetchPokemonList, fetchPokemon } from '@/api/pokemon'
import type { Pokemon, PokemonListResponse } from '@/api/pokemon'

// Hook for fetching a single Pokemon
export function usePokemon(id: string | number) {
  return useQuery<Pokemon>({
    queryKey: ['pokemon', id],
    queryFn: () => fetchPokemon(id),
    enabled: !!id,
  })
}

// Hook for fetching paginated Pokemon list
export function usePokemonList(params?: { limit?: number; offset?: number }) {
  return useQuery<PokemonListResponse>({
    queryKey: ['pokemon-list', params],
    queryFn: () => fetchPokemonList(params),
  })
}

// Hook for fetching paginated Pokemon list with Suspense
export function usePokemonListSuspense(params?: { limit?: number; offset?: number }) {
  return useSuspenseQuery<PokemonListResponse>({
    queryKey: ['pokemon-list', params],
    queryFn: () => fetchPokemonList(params),
  })
}

// Hook for infinite scroll Pokemon list
export function usePokemonInfiniteList(limit: number = 10) {
  return useInfiniteQuery<PokemonListResponse>({
    queryKey: ['pokemon-infinite', limit],
    queryFn: ({ pageParam = 0 }) => fetchPokemonList({ limit, offset: pageParam as number }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined
      // Extract offset from next URL
      const url = new URL(lastPage.next)
      const offset = parseInt(url.searchParams.get('offset') || '0', 10)
      return offset
    },
  })
}


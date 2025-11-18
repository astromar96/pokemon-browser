import { useMemo, Suspense } from 'react'
import { usePokemonListSuspense } from '@/api/usePokemon'
import { PokemonCard } from '@/components/shared/PokemonCard'
import { PokemonCardSkeleton } from '@/components/shared/PokemonCardSkeleton'

const ITEMS_PER_PAGE = 10

interface PokemonGridProps {
  currentPage: number
}

export function PokemonGrid({ currentPage }: PokemonGridProps) {
  const offset = currentPage * ITEMS_PER_PAGE
  const queryParams = useMemo(
    () => ({
      limit: ITEMS_PER_PAGE,
      offset,
    }),
    [offset]
  )

  const { data } = usePokemonListSuspense(queryParams)

  if (!data.results) {
    return null
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
      {data.results.map((pokemon) => (
        <PokemonCard key={pokemon.name} pokemonItem={pokemon} />
      ))}
    </div>
  )
}

export function PokemonGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
      {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
        <PokemonCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function PokemonGridWithSuspense({
  currentPage,
  offset,
}: {
  currentPage: number
  offset: number
}) {
  return (
    <Suspense key={`${currentPage}-${offset}`} fallback={<PokemonGridSkeleton />}>
      <PokemonGrid currentPage={currentPage} />
    </Suspense>
  )
}


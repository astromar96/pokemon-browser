import { useEffect, useRef, useCallback } from 'react'
import { usePokemonInfiniteList } from '@/api/usePokemon'
import { PokemonCard } from '@/components/PokemonCard'
import { PokemonCardSkeleton } from '@/components/PokemonCardSkeleton'
import { Button } from '@/components/ui/button'

const ITEMS_PER_PAGE = 20

function PokemonInfinite() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = usePokemonInfiniteList(ITEMS_PER_PAGE)

  // Ref for the sentinel element that triggers loading more
  const loadMoreRef = useRef<HTMLDivElement>(null)

  // Intersection Observer callback
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  )

  // Set up Intersection Observer
  useEffect(() => {
    const element = loadMoreRef.current
    if (!element) return

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
      rootMargin: '300px', // approximately item height
    })

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [handleObserver])

  // Flatten all pages into a single array
  const allPokemon = data?.pages.flatMap((page) => page.results) ?? []
  const totalCount = data?.pages[0]?.count ?? 0

  if (isError) {
    return (
      <div className="w-full flex justify-center">
        <div className="w-full max-w-7xl px-4 flex flex-col items-center justify-center p-8">
          <p className="text-destructive text-lg mb-4">
            Error loading Pokemon: {error instanceof Error ? error.message : 'Unknown error'}
          </p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-7xl px-4 py-4">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <PokemonCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
              {allPokemon.map((pokemon) => (
                <PokemonCard key={pokemon.name} pokemonItem={pokemon} />
              ))}
            </div>

            {/* Loading skeletons for next page */}
            {isFetchingNextPage && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
                {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                  <PokemonCardSkeleton key={`skeleton-${i}`} />
                ))}
              </div>
            )}

            {/*  */}
            <p className="text-muted-foreground text-sm text-center">
                Showing {allPokemon.length} of {totalCount} Pokemon
            </p>
            {/* Sentinel element for infinite scroll */}
            <div ref={loadMoreRef} className="w-full h-20 flex items-center justify-center">
              {!hasNextPage && allPokemon.length > 0 && (
                <p className="text-muted-foreground text-center py-8">
                  You've reached the end! All {totalCount} Pokemon have been loaded.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default PokemonInfinite


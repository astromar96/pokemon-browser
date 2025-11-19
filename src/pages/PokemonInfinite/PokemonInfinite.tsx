import { useEffect, useState } from 'react'
import { usePokemonInfiniteList } from '@/api/usePokemon'
import { PokemonCard } from '@/components/shared/PokemonCard'
import { PokemonCardSkeleton } from '@/components/shared/PokemonCardSkeleton'
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

  // State to track scroll position for showing scroll to top button
  const [showScrollToTop, setShowScrollToTop] = useState(false)

  // Handle scroll to show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop
      setShowScrollToTop(scrollY > 300) // Show button after scrolling 300px
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

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

            <p className="text-muted-foreground text-sm text-center mb-4">
              Showing {allPokemon.length} of {totalCount} Pokemon
            </p>

            {/* Load More Button */}
            {hasNextPage && (
              <div className="w-full flex items-center justify-center mb-6">
                <Button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  data-testid="load-more-button"
                >
                  {isFetchingNextPage ? 'Loading...' : 'Load More'}
                </Button>
              </div>
            )}

            {/* End message */}
            {!hasNextPage && allPokemon.length > 0 && (
              <p className="text-muted-foreground text-center py-8">
                You've reached the end! All {totalCount} Pokemon have been loaded.
              </p>
            )}
          </>
        )}

        {/* Scroll to Top Button */}
        {showScrollToTop && (
          <Button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 rounded-full h-12 w-12 p-0 shadow-lg z-50"
            size="icon"
            aria-label="Scroll to top"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          </Button>
        )}
      </div>
    </div>
  )
}

export default PokemonInfinite


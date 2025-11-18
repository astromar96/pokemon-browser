import { useState, useRef, useEffect, Suspense, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { usePokemonList, usePokemonListSuspense } from '@/api/usePokemon'
import { PokemonCard } from '@/components/PokemonCard'
import { PokemonCardSkeleton } from '@/components/PokemonCardSkeleton'
import { Button } from '@/components/ui/button'

const ITEMS_PER_PAGE = 10

// Component that uses the hook and can be wrapped in Suspense
function PokemonGrid({ currentPage }: { currentPage: number }) {
  const offset = currentPage * ITEMS_PER_PAGE
  const queryParams = useMemo(() => ({
    limit: ITEMS_PER_PAGE,
    offset,
  }), [offset])
  
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

// Skeleton fallback component
function PokemonGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
      {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
        <PokemonCardSkeleton key={i} />
      ))}
    </div>
  )
}

function PokemonPaginated() {
  const [searchParams, setSearchParams] = useSearchParams()
  const lastCountRef = useRef<number>(0)

  // Read page from URL (1-based), default to 1 if not present or invalid
  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10)
  const initialPage = pageFromUrl > 0 ? pageFromUrl - 1 : 0 // Convert to 0-based
  const [currentPage, setCurrentPage] = useState(initialPage)

  // Sync state with URL when URL changes (e.g., browser back/forward)
  useEffect(() => {
    const urlPage = parseInt(searchParams.get('page') || '1', 10)
    const urlPageZeroBased = urlPage > 0 ? urlPage - 1 : 0
    if (urlPageZeroBased !== currentPage) {
      setCurrentPage(urlPageZeroBased)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const offset = currentPage * ITEMS_PER_PAGE

  // Use a non-suspense query to get the count for pagination
  const { data, error, isFetching, isLoading } = usePokemonList({
    limit: ITEMS_PER_PAGE,
    offset,
  })

  // Preserve the last known count for pagination during loading
  useEffect(() => {
    if (data?.count) {
      lastCountRef.current = data.count
    }
  }, [data])

  // Update URL when page changes
  const updatePage = (page: number) => {
    setCurrentPage(page)
    // Update URL with 1-based page number
    const newSearchParams = new URLSearchParams(searchParams)
    if (page === 0) {
      newSearchParams.delete('page')
    } else {
      newSearchParams.set('page', String(page + 1))
    }
    setSearchParams(newSearchParams, { replace: true })
  }

  const handlePrevious = () => {
    if (currentPage > 0) {
      updatePage(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (data?.next) {
      updatePage(currentPage + 1)
    }
  }

  // Use last known count if data is not available (during loading)
  const count = data?.count ?? lastCountRef.current
  const totalPages = count > 0 ? Math.ceil(count / ITEMS_PER_PAGE) : 0
  const currentPageNumber = currentPage + 1

  const handlePageChange = (page: number) => {
    updatePage(page)
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 7
    const sidePages = Math.floor((maxVisible - 1) / 2)

    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max visible
      for (let i = 0; i < totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(0)

      let startPage = Math.max(1, currentPage - sidePages)
      let endPage = Math.min(totalPages - 2, currentPage + sidePages)

      // Adjust if we're near the start
      if (currentPage <= sidePages) {
        endPage = Math.min(maxVisible - 2, totalPages - 2)
      }

      // Adjust if we're near the end
      if (currentPage >= totalPages - sidePages - 1) {
        startPage = Math.max(1, totalPages - maxVisible + 1)
      }

      // Add ellipsis after first page if needed
      if (startPage > 1) {
        pages.push('ellipsis-start')
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 2) {
        pages.push('ellipsis-end')
      }

      // Always show last page
      pages.push(totalPages - 1)
    }

    return pages
  }

  if (error) {
    return (
      <div className="w-full flex justify-center">
        <div className="w-full max-w-7xl px-4 flex flex-col items-center justify-center p-8">
          <p className="text-destructive text-lg mb-4">Error loading Pokemon</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-7xl px-4 py-4">
        {/* Pokemon Grid with Suspense */}
        {isLoading || (isFetching && !data?.results) ? (
          <PokemonGridSkeleton />
        ) : (
          <Suspense key={`${currentPage}-${offset}`} fallback={<PokemonGridSkeleton />}>
            <PokemonGrid currentPage={currentPage} />
          </Suspense>
        )}

        {/* Pagination Controls */}
        <div className="flex items-center justify-center gap-2 flex-wrap mt-8">
          <Button
            onClick={handlePrevious}
            disabled={currentPage === 0 || isFetching}
            variant="outline"
            size="sm"
          >
            Previous
          </Button>
          
          <div className="flex items-center gap-1">
            {getPageNumbers().map((page, index) => {
              if (typeof page === 'string') {
                return (
                  <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">
                    ...
                  </span>
                )
              }
              
              const pageNumber = page + 1
              const isActive = page === currentPage
              
              return (
                <Button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  disabled={isFetching}
                  variant={isActive ? 'default' : 'outline'}
                  size="sm"
                  className="min-w-[40px]"
                >
                  {pageNumber}
                </Button>
              )
            })}
          </div>

          <Button
            onClick={handleNext}
            disabled={!data?.next || isFetching}
            variant="outline"
            size="sm"
          >
            Next
          </Button>
        </div>

        {/* Pagination Info */}
        <div className="flex items-center justify-center text-muted-foreground mt-6">
          <div className="text-sm font-medium">
            Page {currentPageNumber} of {totalPages || 1} {data?.results ? `(${data.results.length} Pokemon shown)` : isFetching ? '(Loading...)' : ''}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonPaginated


import { useState, useRef, useEffect } from 'react'
import { usePokemonList } from '@/api/usePokemon'
import { PokemonCard } from '@/components/PokemonCard'
import { Button } from '@/components/ui/button'

const ITEMS_PER_PAGE = 10

function PokemonPaginated() {
  const [currentPage, setCurrentPage] = useState(0)
  const offset = currentPage * ITEMS_PER_PAGE
  const lastCountRef = useRef<number>(0)

  const { data, isLoading, error, isFetching } = usePokemonList({
    limit: ITEMS_PER_PAGE,
    offset,
  })

  // Preserve the last known count for pagination during loading
  useEffect(() => {
    if (data?.count) {
      lastCountRef.current = data.count
    }
  }, [data?.count])

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  const handleNext = () => {
    if (data?.next) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  // Use last known count if data is not available (during loading)
  const count = data?.count ?? lastCountRef.current
  const totalPages = count > 0 ? Math.ceil(count / ITEMS_PER_PAGE) : 0
  const currentPageNumber = currentPage + 1

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
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
        {/* Pokemon Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl bg-slate-100 border border-slate-200 p-6 min-h-[240px] animate-pulse"
              />
            ))}
          </div>
        ) : data?.results ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
            {data.results.map((pokemon) => (
              <PokemonCard key={pokemon.name} pokemonItem={pokemon} />
            ))}
          </div>
        ) : null}

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
            Page {currentPageNumber} of {totalPages || 1} {data?.results ? `(${data.results.length} Pokemon shown)` : isLoading ? '(Loading...)' : ''}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonPaginated


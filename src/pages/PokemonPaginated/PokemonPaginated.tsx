import { useState, useRef, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { usePokemonList } from '@/api/usePokemon'
import { Button } from '@/components/ui/button'
import {
  PokemonGridWithSuspense,
  PokemonGridSkeleton,
} from '@/components/pagination/PokemonGrid'
import { PaginationControls } from '@/components/pagination/PaginationControls'
import { PaginationInfo } from '@/components/pagination/PaginationInfo'

const ITEMS_PER_PAGE = 10

function PokemonPaginated() {
  const [searchParams, setSearchParams] = useSearchParams()
  const lastCountRef = useRef<number>(0)

  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10)
  const initialPage = pageFromUrl > 0 ? pageFromUrl - 1 : 0
  const [currentPage, setCurrentPage] = useState(initialPage)

  useEffect(() => {
    const urlPage = parseInt(searchParams.get('page') || '1', 10)
    const urlPageZeroBased = urlPage > 0 ? urlPage - 1 : 0
    if (urlPageZeroBased !== currentPage) {
      setCurrentPage(urlPageZeroBased)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const offset = currentPage * ITEMS_PER_PAGE

  const { data, error, isFetching, isLoading } = usePokemonList({
    limit: ITEMS_PER_PAGE,
    offset,
  })

  useEffect(() => {
    if (data?.count) {
      lastCountRef.current = data.count
    }
  }, [data])

  const updatePage = (page: number) => {
    setCurrentPage(page)
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

  const count = data?.count ?? lastCountRef.current
  const totalPages = count > 0 ? Math.ceil(count / ITEMS_PER_PAGE) : 0
  const currentPageNumber = currentPage + 1

  const handlePageChange = (page: number) => {
    updatePage(page)
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
        {isLoading || (isFetching && !data?.results) ? (
          <PokemonGridSkeleton />
        ) : (
          <PokemonGridWithSuspense currentPage={currentPage} offset={offset} />
        )}

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          isFetching={isFetching}
          onPageChange={handlePageChange}
          onPrevious={handlePrevious}
          onNext={handleNext}
          hasNext={!!data?.next}
        />

        <PaginationInfo
          currentPageNumber={currentPageNumber}
          totalPages={totalPages}
          resultsCount={data?.results?.length}
          isFetching={isFetching}
        />
      </div>
    </div>
  )
}

export default PokemonPaginated

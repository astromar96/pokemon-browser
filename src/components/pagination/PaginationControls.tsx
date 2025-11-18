import { Button } from '@/components/ui/button'

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  isFetching: boolean
  onPageChange: (page: number) => void
  onPrevious: () => void
  onNext: () => void
  hasNext: boolean
}

export function PaginationControls({
  currentPage,
  totalPages,
  isFetching,
  onPageChange,
  onPrevious,
  onNext,
  hasNext,
}: PaginationControlsProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 7
    const sidePages = Math.floor((maxVisible - 1) / 2)

    if (totalPages <= maxVisible) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(0)

      let startPage = Math.max(1, currentPage - sidePages)
      let endPage = Math.min(totalPages - 2, currentPage + sidePages)

      if (currentPage <= sidePages) {
        endPage = Math.min(maxVisible - 2, totalPages - 2)
      }

      if (currentPage >= totalPages - sidePages - 1) {
        startPage = Math.max(1, totalPages - maxVisible + 1)
      }

      if (startPage > 1) {
        pages.push('ellipsis-start')
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      if (endPage < totalPages - 2) {
        pages.push('ellipsis-end')
      }

      pages.push(totalPages - 1)
    }

    return pages
  }

  return (
    <div className="flex items-center justify-center gap-2 flex-wrap mt-8">
      <Button
        onClick={onPrevious}
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
              onClick={() => onPageChange(page)}
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
        onClick={onNext}
        disabled={!hasNext || isFetching}
        variant="outline"
        size="sm"
      >
        Next
      </Button>
    </div>
  )
}


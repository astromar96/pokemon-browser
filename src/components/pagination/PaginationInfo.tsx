interface PaginationInfoProps {
  currentPageNumber: number
  totalPages: number
  resultsCount?: number
  isFetching: boolean
}

export function PaginationInfo({
  currentPageNumber,
  totalPages,
  resultsCount,
  isFetching,
}: PaginationInfoProps) {
  return (
    <div className="flex items-center justify-center text-muted-foreground mt-6">
      <div className="text-sm font-medium">
        Page {currentPageNumber} of {totalPages || 1}{' '}
        {resultsCount
          ? `(${resultsCount} Pokemon shown)`
          : isFetching
            ? '(Loading...)'
            : ''}
      </div>
    </div>
  )
}


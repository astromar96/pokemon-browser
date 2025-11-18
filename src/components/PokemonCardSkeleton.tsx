export function PokemonCardSkeleton() {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 via-purple-50 to-white shadow-md flex flex-col items-center justify-center p-4 animate-pulse">
      {/* Pokemon Image Skeleton */}
      <div className="relative w-full aspect-square mb-3 flex items-center justify-center">
        <div className="w-full h-full bg-blue-200 rounded-full" />
      </div>

      {/* Pokemon Name Skeleton */}
      <div className="h-5 w-24 bg-gray-300 rounded mb-1" />

      {/* Pokemon Number Skeleton */}
      <div className="h-4 w-16 bg-gray-200 rounded" />
    </div>
  )
}


import { BackButton } from '@/components/shared/BackButton'

export function PokemonDetailSkeleton() {
  return (
    <div className="w-full flex justify-center bg-[#fdecf7] min-h-screen">
      <div className="w-full max-w-4xl px-4 py-8">
        <div className="mb-4">
          <BackButton />
        </div>
        {/* Card Container Skeleton */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
          {/* Header Banner Skeleton */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-6 h-6 bg-white/30 rounded" />
              <div className="h-8 w-48 bg-white/30 rounded" />
            </div>
            <div className="h-4 w-16 bg-white/30 rounded mx-auto" />
          </div>

          {/* Main Content Skeleton */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column Skeleton */}
              <div className="flex flex-col items-center">
                {/* Pokemon Image Skeleton */}
                <div className="w-64 h-64 rounded-full bg-gray-200 mb-4" />

                {/* Type Tag Skeleton */}
                <div className="mb-6">
                  <div className="h-7 w-20 bg-gray-200 rounded-full" />
                </div>

                {/* Height and Weight Skeleton */}
                <div className="flex gap-4 w-full">
                  <div className="flex-1 bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 bg-gray-300 rounded" />
                      <div className="h-4 w-12 bg-gray-300 rounded" />
                    </div>
                    <div className="h-6 w-16 bg-gray-300 rounded" />
                  </div>

                  <div className="flex-1 bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 bg-gray-300 rounded" />
                      <div className="h-4 w-14 bg-gray-300 rounded" />
                    </div>
                    <div className="h-6 w-20 bg-gray-300 rounded" />
                  </div>
                </div>
              </div>

              {/* Right Column Skeleton */}
              <div className="flex flex-col gap-6">
                {/* Base Stats Skeleton */}
                <div>
                  <div className="h-6 w-24 bg-gray-300 rounded mb-4" />
                  <div className="space-y-3">
                    {[30, 40, 35, 50, 45, 55].map((width, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-24 h-4 bg-gray-200 rounded" />
                        <div className="flex-1">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gray-300 h-2 rounded-full"
                              style={{ width: `${width}%` }}
                            />
                          </div>
                        </div>
                        <div className="w-12 h-4 bg-gray-200 rounded" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Abilities Skeleton */}
                <div>
                  <div className="h-6 w-20 bg-gray-300 rounded mb-4" />
                  <div className="flex flex-wrap gap-2">
                    <div className="h-7 w-20 bg-gray-200 rounded-full" />
                    <div className="h-7 w-24 bg-gray-200 rounded-full" />
                  </div>
                </div>

                {/* Base Experience Skeleton */}
                <div>
                  <div className="h-6 w-32 bg-gray-300 rounded mb-2" />
                  <div className="h-8 w-20 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePokemon } from '@/api/usePokemon'
import { Button } from '@/components/ui/button'

// Format Pokemon ID with leading zeros
function formatPokemonId(id: string | number): string {
  const numId = typeof id === 'string' ? parseInt(id, 10) : id
  return `#${String(numId).padStart(3, '0')}`
}

// Get Pokemon image URL from ID
function getPokemonImageUrl(id: string | number | null | undefined): string | null {
  if (!id) return null
  const pokemonId = typeof id === 'string' ? id : String(id)
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`
}

// Format stat name for display
function formatStatName(statName: string): string {
  const statMap: Record<string, string> = {
    'hp': 'HP',
    'attack': 'Attack',
    'defense': 'Defense',
    'special-attack': 'Sp. Attack',
    'special-defense': 'Sp. Defense',
    'speed': 'Speed',
  }
  return statMap[statName] || statName
}

// Get stat value from Pokemon stats array
function getStatValue(stats: Array<{ stat: { name: string }; base_stat: number }>, statName: string): number {
  const stat = stats.find((s) => s.stat.name === statName)
  return stat?.base_stat || 0
}

// Format type name (capitalize first letter)
function formatTypeName(typeName: string): string {
  return typeName.charAt(0).toUpperCase() + typeName.slice(1)
}

function PokemonDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: pokemon, isLoading, error } = usePokemon(id || '')
  const [imageError, setImageError] = useState(false)

  // Compute imageUrl early (will be null if pokemon is not available)
  const imageUrl = pokemon ? getPokemonImageUrl(pokemon.id) : null

  // Reset error state when image URL changes - must be before early returns
  useEffect(() => {
    setImageError(false)
  }, [imageUrl])

  if (isLoading) {
    return (
      <div className="w-full flex justify-center bg-[#fdecf7] min-h-screen">
        <div className="w-full max-w-4xl px-4 py-8">
          <div className="mb-4">
            <Button
              onClick={() => navigate('/pokemon/paginated')}
              variant="outline"
              className="bg-white"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to List
            </Button>
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

  if (error || !pokemon) {
    return (
      <div className="w-full flex justify-center bg-[#fdecf7] min-h-screen">
        <div className="w-full max-w-4xl px-4 py-8">
          <div className="mb-4">
            <Button
              onClick={() => navigate('/pokemon/paginated')}
              variant="outline"
              className="bg-white"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to List
            </Button>
          </div>
          <div className="text-center text-red-500">Error loading Pokemon details</div>
        </div>
      </div>
    )
  }

  const pokemonIdDisplay = formatPokemonId(pokemon.id)
  const heightInMeters = pokemon.height / 10 // Convert from decimeters to meters
  const weightInKg = pokemon.weight / 10 // Convert from hectograms to kg

  const handleImageError = () => {
    setImageError(true)
  }

  // Get all stats in order
  const stats = [
    { name: 'hp', value: getStatValue(pokemon.stats, 'hp') },
    { name: 'attack', value: getStatValue(pokemon.stats, 'attack') },
    { name: 'defense', value: getStatValue(pokemon.stats, 'defense') },
    { name: 'special-attack', value: getStatValue(pokemon.stats, 'special-attack') },
    { name: 'special-defense', value: getStatValue(pokemon.stats, 'special-defense') },
    { name: 'speed', value: getStatValue(pokemon.stats, 'speed') },
  ]

  // Get max stat value for progress bar scaling (typically 255 is max, but we'll use 200 for better visual)
  const maxStatValue = 200

  return (
    <div className="w-full flex justify-center bg-[#fdecf7] min-h-screen">
      <div className="w-full max-w-4xl px-4 py-8">
        {/* Back Button */}
        <div className="mb-4">
          <Button
            onClick={() => navigate('/pokemon/paginated')}
            variant="outline"
            className="bg-white"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to List
          </Button>
        </div>
        {/* Card Container */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header Banner with Gradient */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-8 text-white">
            <div className="flex items-center justify-center gap-2 mb-2">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                  clipRule="evenodd"
                />
              </svg>
              <h1 className="text-3xl font-bold uppercase">{pokemon.name}</h1>
            </div>
            <p className="text-center text-sm opacity-90">{pokemonIdDisplay}</p>
          </div>

          {/* Main Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="flex flex-col items-center">
                {/* Pokemon Image */}
                <div className="w-64 h-64 rounded-full bg-gray-100 flex items-center justify-center mb-4 overflow-hidden">
                  {imageUrl && !imageError ? (
                    <img
                      src={imageUrl}
                      alt={pokemon.name}
                      className="w-full h-full object-contain p-4"
                      onError={handleImageError}
                    />
                  ) : (
                    <div className="text-gray-400">No image</div>
                  )}
                </div>

                {/* Type Tag */}
                {pokemon.types.length > 0 && (
                  <div className="mb-6 flex gap-2">
                    {pokemon.types.map((type) => (
                      <span
                        key={type.slot}
                        className="inline-block px-4 py-1 rounded-full bg-red-500 text-white text-sm font-medium"
                      >
                        {formatTypeName(type.type.name)}
                      </span>
                    ))}
                  </div>
                )}

                {/* Height and Weight */}
                <div className="flex gap-4 w-full">
                  <div className="flex-1 bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <svg
                        className="w-4 h-4 text-gray-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm text-gray-600">Height</span>
                    </div>
                    <p className="text-xl font-bold text-gray-900">{heightInMeters} m</p>
                  </div>

                  <div className="flex-1 bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <svg
                        className="w-4 h-4 text-gray-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" />
                      </svg>
                      <span className="text-sm text-gray-600">Weight</span>
                    </div>
                    <p className="text-xl font-bold text-gray-900">{weightInKg} kg</p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-6">
                {/* Base Stats */}
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Base Stats</h2>
                  <div className="space-y-3">
                    {stats.map((stat) => {
                      const percentage = Math.min((stat.value / maxStatValue) * 100, 100)
                      return (
                        <div key={stat.name} className="flex items-center gap-4">
                          <div className="w-24 text-sm text-gray-600 font-medium">
                            {formatStatName(stat.name)}
                          </div>
                          <div className="flex-1">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-gray-700 h-2 rounded-full transition-all"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                          <div className="w-12 text-right text-sm font-medium text-gray-900">
                            {stat.value}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Abilities */}
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Abilities</h2>
                  <div className="flex flex-wrap gap-2">
                    {pokemon.abilities.map((ability) => (
                      <div key={ability.slot} className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-sm">
                          {ability.ability.name}
                        </span>
                        {ability.is_hidden && (
                          <span className="text-xs text-gray-500">(Hidden)</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Base Experience */}
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-2">Base Experience</h2>
                  <p className="text-2xl font-bold text-purple-600">
                    {pokemon.base_experience} XP
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonDetail


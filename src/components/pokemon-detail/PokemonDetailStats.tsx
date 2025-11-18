import type { Pokemon } from '@/api/pokemon'

interface PokemonDetailStatsProps {
  pokemon: Pokemon
}

export function PokemonDetailStats({ pokemon }: PokemonDetailStatsProps) {
  const heightInMeters = pokemon.height / 10 // Convert from decimeters to meters
  const weightInKg = pokemon.weight / 10 // Convert from hectograms to kg

  return (
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
  )
}


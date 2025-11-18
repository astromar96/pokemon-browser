import type { Pokemon } from '@/api/pokemon'

interface PokemonDetailAbilitiesProps {
  abilities: Pokemon['abilities']
}

export function PokemonDetailAbilities({ abilities }: PokemonDetailAbilitiesProps) {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 mb-4">Abilities</h2>
      <div className="flex flex-wrap gap-2">
        {abilities.map((ability) => (
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
  )
}


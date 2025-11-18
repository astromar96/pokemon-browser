import { formatTypeName } from '@/lib/pokemon-utils'
import type { Pokemon } from '@/api/pokemon'

interface PokemonDetailTypesProps {
  types: Pokemon['types']
}

export function PokemonDetailTypes({ types }: PokemonDetailTypesProps) {
  if (types.length === 0) return null

  return (
    <div className="mb-6 flex gap-2">
      {types.map((type) => (
        <span
          key={type.slot}
          className="inline-block px-4 py-1 rounded-full bg-red-500 text-white text-sm font-medium"
        >
          {formatTypeName(type.type.name)}
        </span>
      ))}
    </div>
  )
}


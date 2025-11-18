import { formatPokemonId } from '@/lib/pokemon-utils'
import type { Pokemon } from '@/api/pokemon'

interface PokemonDetailHeaderProps {
  pokemon: Pokemon
}

export function PokemonDetailHeader({ pokemon }: PokemonDetailHeaderProps) {
  const pokemonIdDisplay = formatPokemonId(pokemon.id)

  return (
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
  )
}


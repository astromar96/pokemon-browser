import { useNavigate } from 'react-router-dom'
import { usePokemon } from '@/api/usePokemon'
import { cn } from '@/lib/utils'
import type { Pokemon, PokemonListItem } from '@/api/pokemon'

interface PokemonCardProps {
  pokemon?: Pokemon
  pokemonItem?: PokemonListItem
  className?: string
}

// Extract Pokemon ID from URL
function extractIdFromUrl(url: string): string {
  const parts = url.split('/')
  return parts[parts.length - 2] || ''
}

// Format Pokemon ID with leading zeros
function formatPokemonId(id: string | number): string {
  const numId = typeof id === 'string' ? parseInt(id, 10) : id
  return `#${String(numId).padStart(3, '0')}`
}

// Get Pokemon image URL
function getPokemonImage(pokemon: Pokemon | null): string | null {
  if (!pokemon) return null
  return (
    pokemon.sprites.other?.['official-artwork']?.front_default ||
    pokemon.sprites.front_default ||
    null
  )
}

export function PokemonCard({ pokemon, pokemonItem, className }: PokemonCardProps) {
  const navigate = useNavigate()
  
  // If we have a pokemonItem but not full pokemon data, fetch it
  const pokemonId = pokemon?.id || (pokemonItem ? extractIdFromUrl(pokemonItem.url) : null)
  const { data: fetchedPokemon, isLoading } = usePokemon(
    pokemonId || '',
  )

  const displayPokemon = pokemon || fetchedPokemon
  const isLoadingData = !pokemon && !!pokemonItem && isLoading

  if (!displayPokemon && !pokemonItem) {
    return null
  }

  const pokemonName = displayPokemon?.name || pokemonItem?.name || ''
  const pokemonIdDisplay = displayPokemon?.id || (pokemonItem ? extractIdFromUrl(pokemonItem.url) : '')
  const imageUrl = displayPokemon ? getPokemonImage(displayPokemon) : null

  const handleClick = () => {
    if (pokemonIdDisplay) {
      navigate(`/pokemon/${pokemonIdDisplay}`)
    }
  }

  return (
    <div
      onClick={handleClick}
      className={cn(
        'group relative overflow-hidden rounded-lg',
        'bg-gradient-to-br from-blue-50 via-purple-50 to-white',
        'shadow-md transition-all duration-200',
        'hover:shadow-lg hover:scale-[1.02] cursor-pointer',
        'flex flex-col items-center justify-center p-4',
        className
      )}
    >
      {/* Pokemon Image */}
      <div className="relative w-full aspect-square mb-3 flex items-center justify-center">
        {isLoadingData ? (
          <div className="w-full h-full bg-blue-100 rounded-full animate-pulse" />
        ) : imageUrl ? (
          <img
            src={imageUrl}
            alt={pokemonName}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-400 text-sm">No image</span>
          </div>
        )}
      </div>

      {/* Pokemon Name */}
      <h3 className="text-base font-bold text-gray-900 mb-1 uppercase tracking-wide">
        {pokemonName}
      </h3>

      {/* Pokemon Number */}
      <p className="text-sm text-gray-600 font-medium">
        {formatPokemonId(pokemonIdDisplay)}
      </p>
    </div>
  )
}


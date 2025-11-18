import { useNavigate } from 'react-router-dom'
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

// Get Pokemon image URL from ID
function getPokemonImageUrl(id: string | number | null | undefined): string | null {
  if (!id) return null
  const pokemonId = typeof id === 'string' ? id : String(id)
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`
}

export function PokemonCard({ pokemon, pokemonItem, className }: PokemonCardProps) {
  const navigate = useNavigate()

  if (!pokemonItem) {
    return null
  }

  const pokemonName = pokemon?.name || pokemonItem?.name || ''
  const pokemonIdDisplay = pokemon?.id || (pokemonItem ? extractIdFromUrl(pokemonItem.url) : '')
  const imageUrl = getPokemonImageUrl(pokemonIdDisplay)

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
        {imageUrl ? (
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


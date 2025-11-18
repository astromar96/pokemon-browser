import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { getPokemonImageUrlFallback, formatPokemonId } from '@/lib/pokemon-utils'
import type { Pokemon, PokemonListItem } from '@/api/pokemon'

interface PokemonCardProps {
  pokemon?: Pokemon
  pokemonItem?: PokemonListItem
  className?: string
}

// Extract Pokemon ID from URL
function extractIdFromUrl(url: string): string {
  if (!url) return ''
  const parts = url.split('/').filter(Boolean)
  const id = parts[parts.length - 1] || ''
  // Ensure it's a valid number
  return isNaN(Number(id)) ? '' : id
}

export function PokemonCard({ pokemon, pokemonItem, className }: PokemonCardProps) {
  const navigate = useNavigate()
  const [imageError, setImageError] = useState(false)

  if (!pokemonItem) {
    return null
  }

  const pokemonName = pokemon?.name || pokemonItem?.name || ''
  const pokemonIdDisplay = pokemon?.id || (pokemonItem ? extractIdFromUrl(pokemonItem.url) : '')
  // Try to use sprite from Pokemon object first (home, official artwork, then default), fallback to constructed URLs
  const imageUrl = pokemon?.sprites?.other?.['home']?.front_default
    || pokemon?.sprites?.other?.['official-artwork']?.front_default 
    || pokemon?.sprites?.front_default
    || (pokemonIdDisplay ? getPokemonImageUrlFallback(pokemonIdDisplay) : null)

  // Reset error state when image URL changes
  useEffect(() => {
    setImageError(false)
  }, [imageUrl])

  const handleClick = () => {
    if (pokemonIdDisplay) {
      navigate(`/pokemon/${pokemonIdDisplay}`)
    }
  }

  const handleImageError = () => {
    setImageError(true)
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
        {imageUrl && !imageError ? (
          <img
            src={imageUrl}
            alt={pokemonName}
            className="w-full h-full object-contain"
            loading="lazy"
            onError={handleImageError}
            onLoad={() => setImageError(false)}
          />
        ) : imageError ? (
          <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-400 text-sm">No image</span>
          </div>
        ) : (
          <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-blue-300 text-sm">Loading...</span>
          </div>
        )}
      </div>

      {/* Pokemon Name */}
      <h3 className="text-base font-bold text-gray-900 mb-1 uppercase tracking-wide">
        {pokemonName}
      </h3>

      {/* Pokemon Number */}
      {pokemonIdDisplay && (
        <p className="text-sm text-gray-600 font-medium">
          {formatPokemonId(pokemonIdDisplay)}
        </p>
      )}
    </div>
  )
}


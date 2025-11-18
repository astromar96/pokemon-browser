import { useState, useEffect } from 'react'
import { getPokemonImageUrl } from '@/lib/pokemon-utils'
import type { Pokemon } from '@/api/pokemon'

interface PokemonDetailImageProps {
  pokemon: Pokemon
}

export function PokemonDetailImage({ pokemon }: PokemonDetailImageProps) {
  const [imageError, setImageError] = useState(false)
  const imageUrl = getPokemonImageUrl(pokemon.id)

  useEffect(() => {
    setImageError(false)
  }, [imageUrl])

  const handleImageError = () => {
    setImageError(true)
  }

  return (
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
  )
}


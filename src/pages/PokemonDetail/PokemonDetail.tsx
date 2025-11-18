import { useParams } from 'react-router-dom'
import { usePokemon } from '@/api/usePokemon'
import { BackButton } from '@/components/shared/BackButton'
import { PokemonDetailHeader } from '@/components/pokemon-detail/PokemonDetailHeader'
import { PokemonDetailImage } from '@/components/pokemon-detail/PokemonDetailImage'
import { PokemonDetailTypes } from '@/components/pokemon-detail/PokemonDetailTypes'
import { PokemonDetailStats } from '@/components/pokemon-detail/PokemonDetailStats'
import { PokemonDetailBaseStats } from '@/components/pokemon-detail/PokemonDetailBaseStats'
import { PokemonDetailAbilities } from '@/components/pokemon-detail/PokemonDetailAbilities'
import { PokemonDetailExperience } from '@/components/pokemon-detail/PokemonDetailExperience'
import { PokemonDetailSkeleton } from '@/components/pokemon-detail/PokemonDetailSkeleton'
import { PokemonDetailError } from '@/components/pokemon-detail/PokemonDetailError'

function PokemonDetail() {
  const { id } = useParams<{ id: string }>()
  const { data: pokemon, isLoading, error } = usePokemon(id || '')

  if (isLoading) {
    return <PokemonDetailSkeleton />
  }

  if (error || !pokemon) {
    return <PokemonDetailError />
  }

  return (
    <div className="w-full flex justify-center bg-[#fdecf7] min-h-screen">
      <div className="w-full max-w-4xl px-4 py-8">
        <div className="mb-4">
          <BackButton />
        </div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <PokemonDetailHeader pokemon={pokemon} />
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center">
                <PokemonDetailImage pokemon={pokemon} />
                <PokemonDetailTypes types={pokemon.types} />
                <PokemonDetailStats pokemon={pokemon} />
              </div>
              <div className="flex flex-col gap-6">
                <PokemonDetailBaseStats stats={pokemon.stats} />
                <PokemonDetailAbilities abilities={pokemon.abilities} />
                <PokemonDetailExperience baseExperience={pokemon.base_experience} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonDetail

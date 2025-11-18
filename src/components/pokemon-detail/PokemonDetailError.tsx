import { BackButton } from '@/components/shared/BackButton'

export function PokemonDetailError() {
  return (
    <div className="w-full flex justify-center bg-[#fdecf7] min-h-screen">
      <div className="w-full max-w-4xl px-4 py-8">
        <div className="mb-4">
          <BackButton />
        </div>
        <div className="text-center text-red-500">Error loading Pokemon details</div>
      </div>
    </div>
  )
}


import { formatStatName, getStatValue } from '@/lib/pokemon-utils'
import type { Pokemon } from '@/api/pokemon'

interface PokemonDetailBaseStatsProps {
  stats: Pokemon['stats']
}

const MAX_STAT_VALUE = 200

export function PokemonDetailBaseStats({ stats }: PokemonDetailBaseStatsProps) {
  const statList = [
    { name: 'hp', value: getStatValue(stats, 'hp') },
    { name: 'attack', value: getStatValue(stats, 'attack') },
    { name: 'defense', value: getStatValue(stats, 'defense') },
    { name: 'special-attack', value: getStatValue(stats, 'special-attack') },
    { name: 'special-defense', value: getStatValue(stats, 'special-defense') },
    { name: 'speed', value: getStatValue(stats, 'speed') },
  ]

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 mb-4">Base Stats</h2>
      <div className="space-y-3">
        {statList.map((stat) => {
          const percentage = Math.min((stat.value / MAX_STAT_VALUE) * 100, 100)
          return (
            <div key={stat.name} className="flex items-center gap-4">
              <div className="w-24 text-sm text-gray-600 font-medium">
                {formatStatName(stat.name)}
              </div>
              <div className="flex-1">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gray-700 h-2 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
              <div className="w-12 text-right text-sm font-medium text-gray-900">
                {stat.value}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}


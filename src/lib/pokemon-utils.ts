// Format Pokemon ID with leading zeros
export function formatPokemonId(id: string | number): string {
  const numId = typeof id === 'string' ? parseInt(id, 10) : id
  return `#${String(numId).padStart(3, '0')}`
}

// Get Pokemon image URL from ID
export function getPokemonImageUrl(id: string | number | null | undefined): string | null {
  if (!id) return null
  const pokemonId = typeof id === 'string' ? id : String(id)
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`
}

// Format stat name for display
export function formatStatName(statName: string): string {
  const statMap: Record<string, string> = {
    'hp': 'HP',
    'attack': 'Attack',
    'defense': 'Defense',
    'special-attack': 'Sp. Attack',
    'special-defense': 'Sp. Defense',
    'speed': 'Speed',
  }
  return statMap[statName] || statName
}

// Get stat value from Pokemon stats array
export function getStatValue(
  stats: Array<{ stat: { name: string }; base_stat: number }>,
  statName: string
): number {
  const stat = stats.find((s) => s.stat.name === statName)
  return stat?.base_stat || 0
}

// Format type name (capitalize first letter)
export function formatTypeName(typeName: string): string {
  return typeName.charAt(0).toUpperCase() + typeName.slice(1)
}


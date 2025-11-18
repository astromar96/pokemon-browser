// Format Pokemon ID with leading zeros
export function formatPokemonId(id: string | number): string {
  const numId = typeof id === 'string' ? parseInt(id, 10) : id
  return `#${String(numId).padStart(3, '0')}`
}

// Get Pokemon image URL from ID (fallback when sprite URLs from API are not available)
export function getPokemonImageUrl(id: string | number | null | undefined): string | null {
  if (!id) return null
  const pokemonId = typeof id === 'string' ? id : String(id)
  // Use the basic sprite URL format which is more reliable
  // Try official-artwork first, then fallback to basic sprite
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`
}

// Get fallback Pokemon image URL (basic sprite - more reliable)
export function getPokemonImageUrlFallback(id: string | number | null | undefined): string | null {
  if (!id) return null
  const pokemonId = typeof id === 'string' ? id : String(id)
  // Use the basic sprite URL which is more reliable
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`
}

// Get Pokemon image URL from Pokemon object (preferred method)
export function getPokemonImageUrlFromPokemon(pokemon: { sprites?: { other?: { 'official-artwork'?: { front_default?: string | null } } } } | null | undefined): string | null {
  if (!pokemon?.sprites?.other?.['official-artwork']?.front_default) {
    return null
  }
  return pokemon.sprites.other['official-artwork'].front_default
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


// Types for Pokemon API responses

export interface PokemonListItem {
  name: string
  url: string
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListItem[]
}

export interface Pokemon {
  id: number
  name: string
  base_experience: number
  height: number
  weight: number
  sprites: {
    front_default: string | null
    front_shiny: string | null
    back_default: string | null
    back_shiny: string | null
    other: {
      'official-artwork': {
        front_default: string | null
      }
    }
  }
  types: Array<{
    slot: number
    type: {
      name: string
      url: string
    }
  }>
  stats: Array<{
    base_stat: number
    effort: number
    stat: {
      name: string
      url: string
    }
  }>
  abilities: Array<{
    ability: {
      name: string
      url: string
    }
    is_hidden: boolean
    slot: number
  }>
}

// API functions

const BASE_URL = 'https://pokeapi.co/api/v2'

export async function fetchPokemonList(params?: {
  limit?: number
  offset?: number
}): Promise<PokemonListResponse> {
  const limit = params?.limit ?? 10
  const offset = params?.offset ?? 0
  const url = `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon list: ${response.statusText}`)
  }

  return response.json()
}

export async function fetchPokemon(id: string | number): Promise<Pokemon> {
  const url = `${BASE_URL}/pokemon/${id}`

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon: ${response.statusText}`)
  }

  return response.json()
}


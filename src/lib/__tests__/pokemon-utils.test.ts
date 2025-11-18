import { describe, it, expect } from 'vitest'
import {
  formatPokemonId,
  getPokemonImageUrl,
  getPokemonImageUrlFallback,
  getPokemonImageUrlFromPokemon,
  formatStatName,
  getStatValue,
  formatTypeName,
} from '../pokemon-utils'

describe('formatPokemonId', () => {
  it('should format number ID with leading zeros', () => {
    expect(formatPokemonId(1)).toBe('#001')
    expect(formatPokemonId(25)).toBe('#025')
    expect(formatPokemonId(150)).toBe('#150')
  })

  it('should format string ID with leading zeros', () => {
    expect(formatPokemonId('1')).toBe('#001')
    expect(formatPokemonId('25')).toBe('#025')
    expect(formatPokemonId('150')).toBe('#150')
  })

  it('should handle large numbers', () => {
    expect(formatPokemonId(1000)).toBe('#1000')
    expect(formatPokemonId(9999)).toBe('#9999')
  })
})

describe('getPokemonImageUrl', () => {
  it('should return official artwork URL for valid ID', () => {
    expect(getPokemonImageUrl(1)).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
    )
    expect(getPokemonImageUrl('25')).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'
    )
  })

  it('should return null for null or undefined', () => {
    expect(getPokemonImageUrl(null)).toBeNull()
    expect(getPokemonImageUrl(undefined)).toBeNull()
  })
})

describe('getPokemonImageUrlFallback', () => {
  it('should return fallback official-artwork URL for valid ID', () => {
    expect(getPokemonImageUrlFallback(1)).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
    )
    expect(getPokemonImageUrlFallback('25')).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'
    )
  })

  it('should return null for null or undefined', () => {
    expect(getPokemonImageUrlFallback(null)).toBeNull()
    expect(getPokemonImageUrlFallback(undefined)).toBeNull()
  })
})

describe('getPokemonImageUrlFromPokemon', () => {
  it('should return official artwork URL when available', () => {
    const pokemon = {
      sprites: {
        other: {
          'official-artwork': {
            front_default: 'https://example.com/pikachu.png',
          },
        },
      },
    }
    expect(getPokemonImageUrlFromPokemon(pokemon)).toBe('https://example.com/pikachu.png')
  })

  it('should return null when official artwork is not available', () => {
    expect(getPokemonImageUrlFromPokemon(null)).toBeNull()
    expect(getPokemonImageUrlFromPokemon(undefined)).toBeNull()
    expect(
      getPokemonImageUrlFromPokemon({
        sprites: {
          other: {
            'official-artwork': {
              front_default: null,
            },
          },
        },
      })
    ).toBeNull()
    expect(
      getPokemonImageUrlFromPokemon({
        sprites: {
          other: {},
        },
      })
    ).toBeNull()
    expect(
      getPokemonImageUrlFromPokemon({
        sprites: {},
      })
    ).toBeNull()
  })
})

describe('formatStatName', () => {
  it('should format known stat names correctly', () => {
    expect(formatStatName('hp')).toBe('HP')
    expect(formatStatName('attack')).toBe('Attack')
    expect(formatStatName('defense')).toBe('Defense')
    expect(formatStatName('special-attack')).toBe('Sp. Attack')
    expect(formatStatName('special-defense')).toBe('Sp. Defense')
    expect(formatStatName('speed')).toBe('Speed')
  })

  it('should return original name for unknown stats', () => {
    expect(formatStatName('unknown-stat')).toBe('unknown-stat')
    expect(formatStatName('custom')).toBe('custom')
  })
})

describe('getStatValue', () => {
  it('should return stat value for existing stat', () => {
    const stats = [
      { stat: { name: 'hp' }, base_stat: 100 },
      { stat: { name: 'attack' }, base_stat: 50 },
      { stat: { name: 'defense' }, base_stat: 75 },
    ]
    expect(getStatValue(stats, 'hp')).toBe(100)
    expect(getStatValue(stats, 'attack')).toBe(50)
    expect(getStatValue(stats, 'defense')).toBe(75)
  })

  it('should return 0 for non-existent stat', () => {
    const stats = [
      { stat: { name: 'hp' }, base_stat: 100 },
      { stat: { name: 'attack' }, base_stat: 50 },
    ]
    expect(getStatValue(stats, 'speed')).toBe(0)
    expect(getStatValue(stats, 'unknown')).toBe(0)
  })

  it('should return 0 for empty stats array', () => {
    expect(getStatValue([], 'hp')).toBe(0)
  })
})

describe('formatTypeName', () => {
  it('should capitalize first letter of type name', () => {
    expect(formatTypeName('fire')).toBe('Fire')
    expect(formatTypeName('water')).toBe('Water')
    expect(formatTypeName('electric')).toBe('Electric')
    expect(formatTypeName('grass')).toBe('Grass')
  })

  it('should handle already capitalized names', () => {
    expect(formatTypeName('Fire')).toBe('Fire')
    expect(formatTypeName('WATER')).toBe('WATER')
  })

  it('should handle single character', () => {
    expect(formatTypeName('a')).toBe('A')
  })
})


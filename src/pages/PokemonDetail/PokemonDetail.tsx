import { useParams } from 'react-router-dom'

function PokemonDetail() {
  const { id } = useParams<{ id: string }>()

  return (
    <div>
      <h1>Pokemon Detail</h1>
      <p>Pokemon ID: {id}</p>
    </div>
  )
}

export default PokemonDetail


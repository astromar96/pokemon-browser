import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import './PokemonLayout.scss'

function PokemonLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  const isPaginatedActive = location.pathname === '/pokemon/paginated'
  const isInfiniteActive = location.pathname === '/pokemon/infinite'

  return (
    <div className={`pokemon-layout ${isInfiniteActive ? 'infinite-view' : 'paginated-view'}`}>
      <div className="pokemon-layout-content">
        <h1 className="text-2xl font-bold">Pokedex</h1>
        <p className="text-sm text-gray-500">discover and explore pokemon with {isInfiniteActive ? 'infinite scroll' : 'page controls'}</p>
        <nav>
          <Button
            onClick={() => navigate('/pokemon/paginated')}
            variant={isPaginatedActive ? 'default' : 'outline'}
          >
            Page Controls
          </Button>
          <Button
            onClick={() => navigate('/pokemon/infinite')}
            variant={isInfiniteActive ? 'default' : 'outline'}
          >
            Infinite Scroll
          </Button>
        </nav>
      </div>
      <Outlet />
    </div>
  )
}

export default PokemonLayout


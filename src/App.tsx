import { Routes, Route, Navigate } from 'react-router-dom'
import PokemonLayout from './pages/Pokemon/PokemonLayout'
import PokemonPaginated from './pages/PokemonPaginated/PokemonPaginated'
import PokemonInfinite from './pages/PokemonInfinite/PokemonInfinite'
import PokemonDetail from './pages/PokemonDetail/PokemonDetail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/pokemon/paginated" replace />} />
      <Route path="/pokemon" element={<PokemonLayout />}>
        <Route path="paginated" element={<PokemonPaginated />} />
        <Route path="infinite" element={<PokemonInfinite />} />
      </Route>
      <Route path="/pokemon/:id" element={<PokemonDetail />} />
    </Routes>
  )
}

export default App

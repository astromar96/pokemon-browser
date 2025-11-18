import { Routes, Route, Navigate } from 'react-router-dom'
import { ErrorBoundary } from '@/components/shared/ErrorBoundary'
import PokemonLayout from '@/pages/Pokemon/PokemonLayout'
import PokemonPaginated from '@/pages/PokemonPaginated/PokemonPaginated'
import PokemonInfinite from '@/pages/PokemonInfinite/PokemonInfinite'
import PokemonDetail from '@/pages/PokemonDetail/PokemonDetail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/pokemon/paginated" replace />} />
      <Route
        path="/pokemon"
        element={
          <ErrorBoundary>
            <PokemonLayout />
          </ErrorBoundary>
        }
      >
        <Route
          path="paginated"
          element={
            <ErrorBoundary>
              <PokemonPaginated />
            </ErrorBoundary>
          }
        />
        <Route
          path="infinite"
          element={
            <ErrorBoundary>
              <PokemonInfinite />
            </ErrorBoundary>
          }
        />
      </Route>
      <Route
        path="/pokemon/:id"
        element={
          <ErrorBoundary>
            <PokemonDetail />
          </ErrorBoundary>
        }
      />
    </Routes>
  )
}

export default App

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@/index.css'
import App from '@/App'
import { ErrorBoundary } from '@/components/shared/ErrorBoundary'

// Disable React Query cache when running in Cypress
const isCypress = typeof window !== 'undefined' && (window as any).Cypress

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: isCypress ? 0 : 1000 * 60 * 5, // 5 minutes, or 0 in Cypress
      gcTime: isCypress ? 0 : 1000 * 60 * 5, // 5 minutes, or 0 in Cypress (gcTime replaces cacheTime in v5)
      refetchOnWindowFocus: false,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
)

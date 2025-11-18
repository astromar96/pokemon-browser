import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { render } from '@testing-library/react'

// Create a test query client
export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  })
}

// Custom render function that includes QueryClientProvider
export function renderWithQueryClient(ui: ReactNode, queryClient?: QueryClient) {
  const client = queryClient || createTestQueryClient()
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>)
}

// Re-export everything from React Testing Library
export * from '@testing-library/react'


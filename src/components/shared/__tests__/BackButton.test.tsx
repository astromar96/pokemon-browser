import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { BackButton } from '../BackButton'

// Mock react-router-dom's useNavigate
const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('BackButton', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('should render back button with text', () => {
    render(
      <MemoryRouter>
        <BackButton />
      </MemoryRouter>
    )

    expect(screen.getByText('Back to List')).toBeInTheDocument()
  })

  it('should navigate to paginated list when clicked', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <BackButton />
      </MemoryRouter>
    )

    const button = screen.getByText('Back to List')
    await user.click(button)

    expect(mockNavigate).toHaveBeenCalledWith('/pokemon/paginated')
  })

  it('should have correct button variant and styling', () => {
    render(
      <MemoryRouter>
        <BackButton />
      </MemoryRouter>
    )

    const button = screen.getByText('Back to List')
    expect(button).toHaveClass('bg-white')
  })
})


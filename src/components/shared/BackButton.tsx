import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function BackButton() {
  const navigate = useNavigate()

  return (
    <Button
      onClick={() => navigate('/pokemon/paginated')}
      variant="outline"
      className="bg-white"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      Back to List
    </Button>
  )
}


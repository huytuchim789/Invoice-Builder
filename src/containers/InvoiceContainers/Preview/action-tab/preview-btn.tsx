import { Button } from '@mui/material'
import { useRouter } from 'next/router'

export const PreviewButton = () => {
  const { query } = useRouter()
  const router = useRouter()
  return (
    <Button
      fullWidth
      variant='outlined'
      onClick={() => {
        query?.id && router.push(`/invoice/review/${query?.id}`)
      }}
    >
      Review
    </Button>
  )
}

import { Button } from '@mui/material'
import { useRouter } from 'next/router'

export const ReviewButton = () => {
  const router = useRouter()
  const { query } = useRouter()
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

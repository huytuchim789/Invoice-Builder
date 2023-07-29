import { Button } from '@mui/material'

export const PreviewButton = () => {
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

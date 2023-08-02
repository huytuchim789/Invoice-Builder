import { Box, Button, Card, InputAdornment } from '@mui/material'
import { AddPaymentButton } from '../action-tab/add-payment-btn'
import { ReviewButton } from '../action-tab/review'
import { PreviewButton } from '../action-tab/preview-btn'

const ActionTab = () => {
  return (
    <Card>
      <Box p={3} display='flex' flexDirection={'column'} gap={'10px'}>
        <PreviewButton />
        <ReviewButton />
        <AddPaymentButton />
      </Box>
    </Card>
  )
}

export default ActionTab

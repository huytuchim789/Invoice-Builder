import { Box, Button, Card, InputAdornment } from '@mui/material'

import SendIcon from '@mui/icons-material/Send'
import { AddPaymentButton } from '../action-tab/add-payment-btn'
import { ReviewButton } from '../action-tab/preview-btn'

const ActionTab = () => {
  return (
    <Card>
      <Box p={3} display='flex' flexDirection={'column'} gap={'10px'}>
        <ReviewButton />
        <AddPaymentButton />
      </Box>
    </Card>
  )
}

export default ActionTab

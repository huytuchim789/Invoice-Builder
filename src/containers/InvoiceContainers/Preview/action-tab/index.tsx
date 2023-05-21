import { Box, Card } from '@mui/material'

import { AcceptPaymentSelect } from './accept-payment-select'
import { AddPaymentButton } from './add-payment-btn'
import { SendInvoiceButton } from './send-btn'
import { PreviewButton } from './preview-btn'

export const ActionTab = () => {
  return (
    <>
      <Card>
        <Box p={3} display={'flex'} flexDirection={'column'} gap={'10px'}>
          <SendInvoiceButton />
          <PreviewButton />
          <AddPaymentButton />
        </Box>
      </Card>
      <Box mt={6}>
        <AcceptPaymentSelect />
      </Box>
    </>
  )
}

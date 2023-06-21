import dynamic from 'next/dynamic'
import { Box, Card } from '@mui/material'

import { AcceptPaymentSelect } from './accept-payment-select'
import { AddPaymentButton } from './add-payment-btn'
import { PreviewButton } from './preview-btn'

const SaveButton = dynamic<any>(() => import('./save-btn').then(mod => mod.SaveButton), {
  ssr: false
})

export const ActionTab = () => {
  return (
    <>
      <Card>
        <Box p={3} display={'flex'} flexDirection={'column'} gap={'10px'}>
          <SaveButton />
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

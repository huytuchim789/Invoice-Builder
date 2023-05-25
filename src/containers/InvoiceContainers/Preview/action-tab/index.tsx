import { Box, Card } from '@mui/material'
import { PDFDownloadLink } from '@react-pdf/renderer'

import { AcceptPaymentSelect } from './accept-payment-select'
import { AddPaymentButton } from './add-payment-btn'
import { SendInvoiceButton } from './send-btn'
import { PreviewButton } from './preview-btn'
import InvoicePDF from '../../InvoicePDF'

export const ActionTab = () => {
  return (
    <>
      <Card>
        <Box p={3} display={'flex'} flexDirection={'column'} gap={'10px'}>
          <SendInvoiceButton />
          <PreviewButton />
          <AddPaymentButton />
          <PDFDownloadLink document={<InvoicePDF />} fileName='demo_pdf.pdf'>
            {({ loading }: any) => (loading ? 'Loading document...' : 'Download now!')}
          </PDFDownloadLink>
        </Box>
      </Card>
      <Box mt={6}>
        <AcceptPaymentSelect />
      </Box>
    </>
  )
}

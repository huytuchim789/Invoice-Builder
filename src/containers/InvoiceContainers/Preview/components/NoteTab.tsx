import { useContext } from 'react'

import { Box, Typography } from '@mui/material'

import { IInvoiceDetailData } from 'src/@core/models/api/invoice/invoice.interface'
import { InvoiceDetailContext } from '..'

const NoteTab = () => {
  const { invoice_detail } = useContext(InvoiceDetailContext) as { invoice_detail: IInvoiceDetailData }

  return (
    <Box padding={3} borderTop={1} borderColor={'#808080'}>
      <Typography color='gray'>Note:</Typography>
      <Typography>{invoice_detail.note}</Typography>
    </Box>
  )
}

export default NoteTab

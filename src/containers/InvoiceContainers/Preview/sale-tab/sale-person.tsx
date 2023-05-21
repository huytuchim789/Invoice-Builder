import { useContext } from 'react'

import { Box, Typography } from '@mui/material'

import { InvoiceDetailContext } from '..'
import { IInvoiceDetailData } from 'src/@core/models/api/invoice/invoice.interface'

export const SalePerson = () => {
  const { invoice_detail } = useContext(InvoiceDetailContext) as { invoice_detail: IInvoiceDetailData }

  return (
    <Box display='flex' gap={2} alignItems='center'>
      <Typography>Saleperson:</Typography>
      <Typography>{invoice_detail.sale_person}</Typography>
    </Box>
  )
}

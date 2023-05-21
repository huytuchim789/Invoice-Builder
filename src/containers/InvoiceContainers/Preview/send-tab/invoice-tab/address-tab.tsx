import { useContext } from 'react'

import { Box, Typography } from '@mui/material'
import { InvoiceDetailContext } from '../..'
import { IInvoiceDetailData } from 'src/@core/models/api/invoice/invoice.interface'

export const AddressTab = () => {
  const { invoice_detail } = useContext(InvoiceDetailContext) as { invoice_detail: IInvoiceDetailData }

  return (
    <Box marginTop={2}>
      <Typography fontSize={12} color='#808080'>
        {invoice_detail.customer.name}
        <br />
        {invoice_detail.customer.address}
        <br />
        {invoice_detail.customer.contact_number}
        <br />
        {invoice_detail.customer.email}
      </Typography>
    </Box>
  )
}

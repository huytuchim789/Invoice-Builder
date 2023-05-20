import { useContext } from 'react'

import { Grid, Typography } from '@mui/material'

import { InvoiceDetailContext } from '../..'
import { IInvoiceDetailData } from 'src/@core/models/api/invoice/invoice.interface'

export const InvoiceId = () => {
  const { invoice_detail } = useContext(InvoiceDetailContext) as { invoice_detail: IInvoiceDetailData }

  return (
    <Grid container alignItems='center' marginTop={3} justifyContent='space-between'>
      <Grid item lg={4} md={12}>
        <Typography>Invoice Id:</Typography>
      </Grid>

      <Grid item lg={8} md={12}>
        <Typography fontSize={12}>{invoice_detail.id}</Typography>
      </Grid>
    </Grid>
  )
}

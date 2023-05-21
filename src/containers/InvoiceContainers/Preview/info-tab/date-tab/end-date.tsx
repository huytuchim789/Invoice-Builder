import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useContext } from 'react'

import { Grid, Typography } from '@mui/material'

import { InvoiceDetailContext } from '../..'
import { IInvoiceDetailData } from 'src/@core/models/api/invoice/invoice.interface'

dayjs.extend(utc)

export const EndDate = () => {
  const { invoice_detail } = useContext(InvoiceDetailContext) as { invoice_detail: IInvoiceDetailData }

  return (
    <Grid container alignItems='center' marginTop={3} justifyContent='space-between'>
      <Grid item lg={4}>
        <Typography>Date Due:</Typography>
      </Grid>

      <Grid item lg={8}>
        <Typography>{invoice_detail.issued_date}</Typography>
      </Grid>
    </Grid>
  )
}

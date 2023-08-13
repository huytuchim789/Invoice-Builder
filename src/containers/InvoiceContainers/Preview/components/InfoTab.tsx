import { useContext } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { InvoiceDetailContext } from '..'
import { IInvoiceDetailData } from 'src/@core/models/api/invoice/invoice.interface'
import BaseGridComponent from '../atoms/BaseGridComponent'
import AddressInfo from 'src/@core/components/Invoice/AddressInfo'

const InfoTab = () => {
  const { invoice_detail } = useContext(InvoiceDetailContext) as { invoice_detail: IInvoiceDetailData }

  return (
    <Box padding={3}>
      <Grid container justifyContent='space-between'>
        <Grid item lg={7} md={7} sm={7} xs={12}>
          <Typography variant='h6'>Invoice</Typography>
          <Box marginTop={4}>
            <AddressInfo />
          </Box>
        </Grid>
        <Grid item lg={5} md={5} sm={5} xs={12}>
          <BaseGridComponent title='Invoice Code' description={invoice_detail.code} />
          <BaseGridComponent title='Date Issued' description={invoice_detail.created_date} />
          <BaseGridComponent title='Due Date' description={invoice_detail.issued_date} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default InfoTab

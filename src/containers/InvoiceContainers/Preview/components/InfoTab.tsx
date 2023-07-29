import { useContext } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { InvoiceDetailContext } from '..'
import { IInvoiceDetailData } from 'src/@core/models/api/invoice/invoice.interface'
import BaseGridComponent from '../atoms/BaseGridComponent'

const InfoTab = () => {
  const { invoice_detail } = useContext(InvoiceDetailContext) as { invoice_detail: IInvoiceDetailData }

  return (
    <Box padding={3}>
      <Grid container justifyContent='space-between'>
        <Grid item lg={7} md={7} sm={7} xs={12}>
          <Typography variant='h6'>Invoice</Typography>
          <Box marginTop={4}>
            <Typography fontSize={12} color={'#808080'}>
              Office 149, 450 South Brand Brooklyn
              <br />
              San Diego County, CA 91905, USA
              <br />
              +1 (123) 456 7891, +44 (876) 543 2198
            </Typography>
          </Box>
        </Grid>
        <Grid item lg={5} md={5} sm={5} xs={12}>
          <BaseGridComponent title='Invoice Id' description={invoice_detail.code} />
          <BaseGridComponent title='Date Issued' description={invoice_detail.created_at} />
          <BaseGridComponent title='Due Date' description={invoice_detail.issued_date} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default InfoTab

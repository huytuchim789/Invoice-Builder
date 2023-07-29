import { Box, Grid, Typography } from '@mui/material'
import { useContext } from 'react'
import { InvoiceDetailContext } from '..'
import { IInvoiceDetailData } from 'src/@core/models/api/invoice/invoice.interface'
import BaseGridComponent from '../atoms/BaseGridComponent'

const SalePersonTab = () => {
  const { invoice_detail } = useContext(InvoiceDetailContext) as { invoice_detail: IInvoiceDetailData }

  return (
    <Box padding={3} borderTop={1} borderColor={'#808080'} mt={6}>
      <Grid container justifyContent='space-between'>
        <Grid item sm={4} md={4} lg={4}>
          <Box display='flex' gap={2} alignItems='center'>
            <Typography>Saleperson:</Typography>
            <Typography>{invoice_detail.sale_person}</Typography>
          </Box>
        </Grid>
        <Grid item sm={4} md={4} lg={4}>
          <BaseGridComponent
            title='Sub Total'
            description={`$ ${Math.round(invoice_detail.total - (invoice_detail.total * invoice_detail.tax) / 100)}`}
          />
          <BaseGridComponent title='Tax' description={`${invoice_detail.tax}%`} />
          <BaseGridComponent title='Total' description={`$ ${invoice_detail.total}`} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default SalePersonTab

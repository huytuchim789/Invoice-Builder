import { Box, Grid, Typography } from '@mui/material'
import { IInvoiceDetailData } from 'src/@core/models/api/invoice/invoice.interface'
import { InvoiceDetailContext } from '..'
import { useContext } from 'react'
import BillingInfo from 'src/@core/components/BillingInfo/BillingInfo'

const UserInfoSelectTab = () => {
  const { invoice_detail } = useContext(InvoiceDetailContext) as { invoice_detail: IInvoiceDetailData }

  return (
    <Box padding={3} borderColor='#808080' borderTop={1} mt={2}>
      <Grid container justifyContent={'space-between'}>
        <Grid item sm={12} md={4} lg={4}>
          <Typography>Invoice To:</Typography>
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
        </Grid>
        <Grid item sm={12} md={4} lg={4}>
          <BillingInfo imgUrl={invoice_detail?.qr_code} alt='No Qr' />
        </Grid>
      </Grid>
    </Box>
  )
}

export default UserInfoSelectTab

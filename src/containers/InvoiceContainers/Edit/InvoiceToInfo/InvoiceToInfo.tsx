import { Grid, Box, Typography } from '@mui/material'

import UserInfoSelect from 'src/@core/components/Invoice/UserInfoSelect/UserInfoSelect'
import UserInfo from 'src/@core/components/Invoice/UserInfoSelect/UserInfo'
import BillingInfo from 'src/@core/components/BillingInfo/BillingInfo'
import { useContext } from 'react'
import { InvoiceEditContext } from '..'
import { IInvoiceDetailData } from 'src/@core/models/api/invoice/invoice.interface'

const InvoiceTo = () => {
  const { isLoadingScreen, invoice_detail } = useContext(InvoiceEditContext) as {
    isLoadingScreen: boolean
    invoice_detail: IInvoiceDetailData
  }

  return (
    <Box padding={3} borderColor='#808080' borderTop={1} mt={2}>
      <Grid container justifyContent={'space-between'}>
        <Grid item sm={4} md={4} lg={4}>
          <Typography>Invoice To:</Typography>
          <UserInfoSelect hasModal={true} isLoading={isLoadingScreen} />
          <UserInfo isLoading={isLoadingScreen} />
        </Grid>
        <Grid item sm={4} md={4} lg={4}>
          <BillingInfo imgUrl={invoice_detail?.qr_code} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default InvoiceTo

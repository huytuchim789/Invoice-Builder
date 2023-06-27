import { Grid, Box, Typography } from '@mui/material'

import UserInfoSelect from 'src/@core/components/Invoice/UserInfoSelect/UserInfoSelect'
import UserInfo from 'src/@core/components/Invoice/UserInfoSelect/UserInfo'
import BillingInfo from 'src/@core/components/BillingInfo/BillingInfo'

const InvoiceTo = () => {
  return (
    <Box padding={3} borderColor='#808080' borderTop={1} mt={2}>
      <Grid container justifyContent={'space-between'}>
        <Grid item sm={4} md={4} lg={4}>
          <Typography>Invoice To:</Typography>
          <UserInfoSelect hasModal={true} />
          <UserInfo />
        </Grid>
        <Grid item sm={4} md={4} lg={4}>
          <BillingInfo />
        </Grid>
      </Grid>
    </Box>
  )
}

export default InvoiceTo

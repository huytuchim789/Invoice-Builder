import { Box, Grid } from '@mui/material'

import DateInfo from 'src/@core/components/Invoice/DateInfo/DateInfo'
import AddressInfo from 'src/@core/components/Invoice/AddressInfo'

const BusinessInfo = () => {
  return (
    <Box padding={3}>
      <Grid container justifyContent='space-between'>
        <Grid item lg={7} md={7} sm={12}>
          <AddressInfo />
        </Grid>
        <Grid item lg={5} md={5} sm={12}>
          <DateInfo />
        </Grid>
      </Grid>
    </Box>
  )
}

export default BusinessInfo

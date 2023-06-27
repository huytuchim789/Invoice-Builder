import { Box, Grid } from '@mui/material'
import { DateTab } from './date-tab'
import AddressInfo from 'src/@core/components/Invoice/AddressInfo'

export const InfoTab = () => {
  return (
    <Box padding={3}>
      <Grid container justifyContent='space-between'>
        <Grid item lg={7} md={12} sm={12} xs={12}>
          <AddressInfo />
        </Grid>
        <Grid item lg={5} md={12} sm={12} xs={12}>
          <DateTab />
        </Grid>
      </Grid>
    </Box>
  )
}

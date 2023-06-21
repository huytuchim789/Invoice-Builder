import { Box, Grid } from '@mui/material'
import { DateTab } from './date-tab'
import AddressTab from 'src/@core/components/AddressTab'

export const InfoTab = () => {
  return (
    <Box padding={3}>
      <Grid container justifyContent='space-between'>
        <Grid item lg={7} md={12} sm={12} xs={12}>
          <AddressTab />
        </Grid>
        <Grid item lg={5} md={12} sm={12} xs={12}>
          <DateTab />
        </Grid>
      </Grid>
    </Box>
  )
}

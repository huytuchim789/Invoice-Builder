import { Box, Grid } from '@mui/material'
import { AddressTab } from './address-tab'
import { DateTab } from './date-tab'

export const InfoTab = () => {
  return (
    <Box padding={3}>
      <Grid container justifyContent='space-between'>
        <Grid item lg={7} md={12}>
          <AddressTab />
        </Grid>
        <Grid item lg={5} md={12}>
          <DateTab />
        </Grid>
      </Grid>
    </Box>
  )
}

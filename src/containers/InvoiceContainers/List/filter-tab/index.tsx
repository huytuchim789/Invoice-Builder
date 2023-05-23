import { Box, Grid } from '@mui/material'

import { InvoiceStatusFilter } from './status-tab'

export const FilterTab = () => {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item lg={6} md={6} sm={12}>
          <InvoiceStatusFilter />
        </Grid>
        <Grid item lg={6} md={6} sm={12}></Grid>
      </Grid>
    </Box>
  )
}

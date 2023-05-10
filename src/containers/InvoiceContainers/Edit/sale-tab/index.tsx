import { Box, Grid } from '@mui/material'

import { SalePerson } from './sale-person'
import { Accumulate } from './accumulate-tab'

export const SaleTab = () => {
  return (
    <Box padding={3} borderTop={1} borderColor={'#808080'} mt={6}>
      <Grid container justifyContent='space-between'>
        <Grid item sm={4} md={4} lg={4}>
          <SalePerson />
        </Grid>
        <Grid item sm={4} md={4} lg={4}>
          <Accumulate />
        </Grid>
      </Grid>
    </Box>
  )
}

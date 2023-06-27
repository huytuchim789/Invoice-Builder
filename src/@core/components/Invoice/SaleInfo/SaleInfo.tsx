import { Box, Grid } from '@mui/material'

import SalePerson from './SalePerson'
import AccumulateInfo from './AccumulateInfo'

const SaleInfo = () => {
  return (
    <Box padding={3} borderTop={1} borderColor={'#808080'} mt={6}>
      <Grid container justifyContent='space-between'>
        <Grid item sm={4} md={4} lg={4}>
          <SalePerson />
        </Grid>
        <Grid item sm={4} md={4} lg={4}>
          <AccumulateInfo />
        </Grid>
      </Grid>
    </Box>
  )
}

export default SaleInfo

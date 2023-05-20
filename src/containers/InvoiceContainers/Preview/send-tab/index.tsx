import { Grid, Box } from '@mui/material'

import { InvoiceTab } from './invoice-tab'
import { BillTab } from './bill-tab'

export const SendTab = () => {
  return (
    <Box padding={3} borderColor='#808080' borderTop={1} mt={2}>
      <Grid container justifyContent={'space-between'}>
        <Grid item sm={4} md={4} lg={4}>
          <InvoiceTab />
        </Grid>
        <Grid item sm={4} md={4} lg={4}>
          <BillTab />
        </Grid>
      </Grid>
    </Box>
  )
}

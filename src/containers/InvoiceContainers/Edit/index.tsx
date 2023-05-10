import { Card, Grid } from '@mui/material'

import { InfoTab } from './info-tab'
import { SendTab } from './send-tab'
import { ActionTab } from './action-tab'
import { ItemTab } from './item-tab'
import { SaleTab } from './sale-tab'

export const InvoiceEdit = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={9}>
        <Card style={{ width: '100%' }}>
          <InfoTab />
          <SendTab />
          <ItemTab />
          <SaleTab />
        </Card>
      </Grid>
      <Grid item xs={12} md={12} lg={3}>
        <ActionTab />
      </Grid>
    </Grid>
  )
}

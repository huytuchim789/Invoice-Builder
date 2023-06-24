import React from 'react'
import { Card, Grid } from '@mui/material'

import { InfoTab } from './info-tab'
import { ActionTab } from './action-tab'
import { ItemTab } from './item-tab'
import { SaleTab } from './sale-tab'
import { NoteTab } from './note-tab'
import InvoiceTo from './send-tab/InvoiceTo'

export const InvoiceAdd = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={9}>
        <Card style={{ width: '100%' }}>
          <InfoTab />
          <InvoiceTo />
          <ItemTab />
          <SaleTab />
          <NoteTab />
        </Card>
      </Grid>
      <Grid item xs={12} md={12} lg={3}>
        <ActionTab />
      </Grid>
    </Grid>
  )
}

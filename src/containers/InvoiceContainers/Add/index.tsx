import React from 'react'
import { Card, Grid } from '@mui/material'

import BusinessInfo from './BusinessInfo/BusinessInfo'
import InvoiceToInfo from './InvoiceToInfo/InvoiceToInfo'
import ItemInfo from 'src/@core/components/Invoice/ItemInfo/ItemInfo'
import SaleInfo from 'src/@core/components/Invoice/SaleInfo/SaleInfo'
import NoteInfo from 'src/@core/components/Invoice/NoteInfo/NoteInfo'
import ActionButtons from './ActionButtons/Actions'

export const InvoiceAdd = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={9}>
        <Card style={{ width: '100%' }}>
          <BusinessInfo />
          <InvoiceToInfo />
          <ItemInfo />
          <SaleInfo />
          <NoteInfo />
        </Card>
      </Grid>
      <Grid item xs={12} md={12} lg={3}>
        <ActionButtons />
      </Grid>
    </Grid>
  )
}

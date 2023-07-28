import React from 'react'
import { useRouter } from 'next/router'

import { Card, Grid } from '@mui/material'

import { ActionTab, InfoTab, ItemTab, NoteTab, SalePersonTab, UserSelectInfoTab } from './components'

import { useInvoiceDetailData } from 'src/@core/hooks/invoice/useInvoiceDetailData'

export const InvoiceDetailContext = React.createContext({})

export const InvoicePreview = () => {
  const { query } = useRouter()
  const { data: invoice_detail } = useInvoiceDetailData(query?.id ? query.id : '')

  return (
    <Grid container spacing={3}>
      {invoice_detail && (
        <InvoiceDetailContext.Provider value={{ invoice_detail: invoice_detail }}>
          <Grid item xs={12} md={12} lg={9}>
            <Card style={{ width: '100%' }}>
              <InfoTab />
              <UserSelectInfoTab />
              <ItemTab />
              <SalePersonTab />
              <NoteTab />
            </Card>
          </Grid>
          <Grid item xs={12} md={12} lg={3}>
            <ActionTab />
          </Grid>
        </InvoiceDetailContext.Provider>
      )}
    </Grid>
  )
}

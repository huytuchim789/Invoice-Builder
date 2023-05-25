import React from 'react'
import { useRouter } from 'next/router'

import { Box, Card, Grid } from '@mui/material'

import { useInvoiceDetailData } from 'src/@core/hooks/invoice/useInvoiceDetailData'

import { ActionTab } from './action-tab'
import { NoteTab } from './note-tab'
import { InfoTab } from './info-tab'
import { ItemTab } from './item-tab'
import { SendTab } from './send-tab'
import { SaleTab } from './sale-tab'
import { DrawerSendInvoice } from './drawer-tab/drawer-invoice'

export const InvoiceDetailContext = React.createContext({})

export const InvoicePreview = () => {
  const { query } = useRouter()
  const { data: invoice_detail } = useInvoiceDetailData(query?.id ? query.id : '')

  return (
    <Box>
      {invoice_detail && (
        <Grid container spacing={3}>
          <InvoiceDetailContext.Provider value={{ invoice_detail: invoice_detail }}>
            <Grid item xs={12} md={12} lg={9}>
              <Card style={{ width: '100%' }}>
                <InfoTab />
                <SendTab />
                <ItemTab />
                <SaleTab />
                <NoteTab />
              </Card>
            </Grid>
            <Grid item xs={12} md={12} lg={3}>
              <ActionTab />
            </Grid>
            <DrawerSendInvoice />
          </InvoiceDetailContext.Provider>
        </Grid>
      )}
    </Box>
  )
}

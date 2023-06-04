import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import { Card, Grid } from '@mui/material'

import { ActionTab } from './action-tab'
import { InfoTab } from './info-tab'
import { SendTab } from './send-tab'
import { ItemTab } from './item-tab'
import { SaleTab } from './sale-tab'
import { NoteTab } from './note-tab'

import { useInvoiceDetailData } from 'src/@core/hooks/invoice/useInvoiceDetailData'
import { useInvoiceEditStore } from './store'

export const InvoiceEditContext = React.createContext({})

export const InvoiceEdit = () => {
  const { query } = useRouter()
  const [userSelect, items, dateSelect, noteSelect] = useInvoiceEditStore((state: any) => [
    state.userSelectTabStore,
    state.itemContentTabStore,
    state.dateSelectStore,
    state.noteTabStore
  ])

  const { data: invoice_detail } = useInvoiceDetailData(query?.id ? query.id : '')

  useEffect(() => {
    if (invoice_detail) {
      userSelect.setUser(invoice_detail.customer)
      items.setItemContent(invoice_detail.items)
      dateSelect.setDate('start', invoice_detail.created_date)
      dateSelect.setDate('end', invoice_detail.issued_date)
      noteSelect.setNote(invoice_detail.note)
    }
  }, [invoice_detail])

  return (
    <React.Fragment>
      <Grid container spacing={3}>
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
      </Grid>
    </React.Fragment>
  )
}

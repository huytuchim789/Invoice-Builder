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
import useInvoiceStore from 'src/@core/components/Invoice/store'

export const InvoiceEditContext = React.createContext({})

export const InvoiceEdit = () => {
  const { query } = useRouter()
  const { itemInfo, userSelectInfo, noteInfo, dateInfo, invoiceId } = useInvoiceStore()

  const { data: invoice_detail } = useInvoiceDetailData(query?.id ? query.id : '')

  useEffect(() => {
    if (invoice_detail) {
      userSelectInfo.setUser(invoice_detail.customer)
      itemInfo.setAllItemContent(invoice_detail.items)
      dateInfo.setDate('start', invoice_detail.created_date)
      dateInfo.setDate('end', invoice_detail.issued_date)
      noteInfo.setNote(invoice_detail.note)
      invoiceId.setInvoiceId(invoice_detail.id)
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

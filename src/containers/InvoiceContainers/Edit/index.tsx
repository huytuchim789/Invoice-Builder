import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import { Card, Grid } from '@mui/material'

import { ActionTab } from './action-tab'
import InvoiceToInfo from './InvoiceToInfo/InvoiceToInfo'

import { useInvoiceDetailData } from 'src/@core/hooks/invoice/useInvoiceDetailData'
import useInvoiceStore from 'src/@core/components/Invoice/store'
import BusinessInfo from '../Add/BusinessInfo/BusinessInfo'
import ItemInfo from 'src/@core/components/Invoice/ItemInfo/ItemInfo'
import SaleInfo from 'src/@core/components/Invoice/SaleInfo/SaleInfo'
import NoteInfo from 'src/@core/components/Invoice/NoteInfo/NoteInfo'

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
            <BusinessInfo />
            <InvoiceToInfo />
            <ItemInfo />
            <SaleInfo />
            <NoteInfo />
          </Card>
        </Grid>
        <Grid item xs={12} md={12} lg={3}>
          <ActionTab />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

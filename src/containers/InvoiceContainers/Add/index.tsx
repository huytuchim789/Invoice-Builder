import React from 'react'
import { FormProvider } from 'react-hook-form'

import { Card, Grid } from '@mui/material'

import BusinessInfo from './BusinessInfo/BusinessInfo'
import InvoiceToInfo from './InvoiceToInfo/InvoiceToInfo'

import extendedDayJs from 'src/@core/utils/dayjs'
import ItemInfo from 'src/@core/components/Invoice/ItemInfo/ItemInfo'
import SaleInfo from 'src/@core/components/Invoice/SaleInfo/SaleInfo'
import NoteInfo from 'src/@core/components/Invoice/NoteInfo/NoteInfo'

import ActionButtons from './ActionButtons/Actions'
import useInvoiceDetailController from './controller'

export const invoiceCurrentValue = {
  startDate: extendedDayJs().toDate(),
  endDate: extendedDayJs().toDate(),
  note: '',
  items: [
    {
      hours: '',
      cost: '',
      description: '',
      name: ''
    }
  ]
}

export const InvoiceAdd = () => {
  const { methods, handleSaveInvoice } = useInvoiceDetailController()

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSaveInvoice)}>
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
      </form>
    </FormProvider>
  )
}

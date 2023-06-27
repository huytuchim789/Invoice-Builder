import React from 'react'
import { Document, Font, Page } from '@react-pdf/renderer'

import { InfoTabPdf } from './info-tab'
import { SendTabPdf } from './send-tab'
import { ItemsTabPdf } from './items-tab'
import { SalePdfTab } from './sale-tab'
import { NotePdfTab } from './note-tab'

import { IInvoiceDetailLocalData } from 'src/@core/models/api/invoice/invoice.interface'

export const InvoiceDetailPdfContext = React.createContext({})

Font.register({
  family: 'AlegreyaSans',
  fonts: [
    {
      src: '/fonts/AlegreyaSans-Light.ttf'
    },
    {
      src: '/fonts/AlegreyaSans-Bold.ttf',
      fontWeight: 'bold'
    }
  ]
})

const InvoicePDF = ({ invoice_detail }: { invoice_detail: IInvoiceDetailLocalData }) => {
  return (
    <InvoiceDetailPdfContext.Provider value={{ invoice_detail: invoice_detail }}>
      <Document>
        <Page style={{ padding: '10px', fontFamily: 'AlegreyaSans' }}>
          <InfoTabPdf />
          <SendTabPdf />
          <ItemsTabPdf />
          <SalePdfTab />
          <NotePdfTab />
        </Page>
      </Document>
    </InvoiceDetailPdfContext.Provider>
  )
}

export default InvoicePDF

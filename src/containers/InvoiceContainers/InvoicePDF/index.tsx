import React from 'react'
import { Document, Page } from '@react-pdf/renderer'

import { InfoTabPdf } from './info-tab'
import { SendTabPdf } from './send-tab'
import { ItemsTabPdf } from './items-tab'
import { SalePdfTab } from './sale-tab'
import { NotePdfTab } from './note-tab'

import { IInvoiceDetailData } from 'src/@core/models/api/invoice/invoice.interface'

export const InvoiceDetailPdfContext = React.createContext({})

const InvoicePDF = ({ invoice_detail }: { invoice_detail: IInvoiceDetailData }) => {
  return (
    <InvoiceDetailPdfContext.Provider value={{ invoice_detail: invoice_detail }}>
      <Document>
        <Page style={{ padding: '10px' }}>
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

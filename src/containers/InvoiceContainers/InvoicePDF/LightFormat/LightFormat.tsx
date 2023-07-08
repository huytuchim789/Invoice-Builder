import BusinessPdfInfo from './BusinessInfo/BusinessInfo'
import { Document, Font, Page } from '@react-pdf/renderer'
import { IInvoiceDetailLocalData } from 'src/@core/models/api/invoice/invoice.interface'
import React from 'react'
import { getFontRegister } from '../components/common'
import InvoiceToInfo from './InvoiceToInfo/InvoiceToInfo'
import ItemsPdfInfo from './ItemsInfo/ItemsInfo'
import NotePdfInfo from '../components/NotePdfInfo/NotePdfInfo'
import SaleInfoPdf from './SaleInfo'

export const InvoiceLightPdfContext = React.createContext({})

const InoviceLightFormatPdf = ({ invoice_detail, font }: { invoice_detail: IInvoiceDetailLocalData; font: string }) => {
  Font.register(getFontRegister(font))
  return (
    <InvoiceLightPdfContext.Provider value={{ invoice_detail }}>
      <Document>
        <Page style={{ padding: '10px', fontFamily: getFontRegister(font).family }}>
          <BusinessPdfInfo />
          <InvoiceToInfo />
          <ItemsPdfInfo />
          <SaleInfoPdf />
          <NotePdfInfo invoice_detail={invoice_detail} />
        </Page>
      </Document>
    </InvoiceLightPdfContext.Provider>
  )
}

export default InoviceLightFormatPdf

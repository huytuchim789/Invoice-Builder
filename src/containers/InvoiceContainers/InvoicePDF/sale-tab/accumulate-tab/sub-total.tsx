import { useContext } from 'react'

import { IInvoiceDetailData } from 'src/@core/models/api/invoice/invoice.interface'
import { InvoiceDetailPdfContext } from '../..'

import { GridPrdComponent } from '../components/grid-accumulate'

export const SubTotalPdf = () => {
  const { invoice_detail } = useContext(InvoiceDetailPdfContext) as { invoice_detail: IInvoiceDetailData }
  return (
    <GridPrdComponent
      title='Sub Total'
      content={`${Math.round(invoice_detail.total - (invoice_detail.total * invoice_detail.tax) / 100)}`}
      isTotal={false}
    />
  )
}

import { useContext } from 'react'

import { IInvoiceDetailData } from 'src/@core/models/api/invoice/invoice.interface'
import { InvoiceDetailPdfContext } from '../..'

import { GridPrdComponent } from '../components/grid-accumulate'

export const TaxPdf = () => {
  const { invoice_detail } = useContext(InvoiceDetailPdfContext) as { invoice_detail: IInvoiceDetailData }

  return <GridPrdComponent title='Tax' content={`${invoice_detail.tax}%`} isTotal={false} />
}

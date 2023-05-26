import { useContext } from 'react'

import { IInvoiceDetailData } from 'src/@core/models/api/invoice/invoice.interface'

import { InvoiceDetailPdfContext } from '../..'
import { InfoPdfComponent } from './common/InfoComponent'

export const InvoiceIdPdf = () => {
  const { invoice_detail } = useContext(InvoiceDetailPdfContext) as { invoice_detail: IInvoiceDetailData }

  return <InfoPdfComponent title='Invoice ID' content={invoice_detail.id} />
}

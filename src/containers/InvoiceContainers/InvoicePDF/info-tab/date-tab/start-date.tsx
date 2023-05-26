import { useContext } from 'react'
import { InfoPdfComponent } from './common/InfoComponent'
import { InvoiceDetailPdfContext } from '../..'
import { IInvoiceDetailData } from 'src/@core/models/api/invoice/invoice.interface'

export const StartDatePdf = () => {
  const { invoice_detail } = useContext(InvoiceDetailPdfContext) as { invoice_detail: IInvoiceDetailData }

  return <InfoPdfComponent title='Start Date' content={invoice_detail.created_date} />
}

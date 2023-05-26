import { useContext } from 'react'
import { InvoiceDetailPdfContext } from '../..'
import { InfoPdfComponent } from './common/InfoComponent'
import { IInvoiceDetailData } from 'src/@core/models/api/invoice/invoice.interface'

export const EndDatePdf = () => {
  const { invoice_detail } = useContext(InvoiceDetailPdfContext) as { invoice_detail: IInvoiceDetailData }

  return <InfoPdfComponent title='End Date' content={invoice_detail.issued_date} />
}

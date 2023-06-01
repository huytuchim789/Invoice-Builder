import { useContext } from 'react'

import { InvoiceDetailContext } from '../..'

import { IInvoiceDetailData } from 'src/@core/models/api/invoice/invoice.interface'
import { GridAccumulate } from '../components/grid-accumulate'

export const SubTotal = () => {
  const { invoice_detail } = useContext(InvoiceDetailContext) as { invoice_detail: IInvoiceDetailData }

  return (
    <GridAccumulate
      title='Subtotal'
      content={`$ ${Math.round(invoice_detail.total - (invoice_detail.total * invoice_detail.tax) / 100)}`}
    />
  )
}

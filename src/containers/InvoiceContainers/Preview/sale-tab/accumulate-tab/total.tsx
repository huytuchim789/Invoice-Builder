import { useContext } from 'react'

import { InvoiceDetailContext } from '../..'
import { GridAccumulate } from '../components/grid-accumulate'
import { IInvoiceDetailData } from 'src/@core/models/api/invoice/invoice.interface'

export const Total = () => {
  const { invoice_detail } = useContext(InvoiceDetailContext) as { invoice_detail: IInvoiceDetailData }

  return <GridAccumulate title='Total' content={`${invoice_detail.total}`} />
}

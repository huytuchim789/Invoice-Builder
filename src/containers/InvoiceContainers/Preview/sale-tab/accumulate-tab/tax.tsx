import { useContext } from 'react'

import { InvoiceDetailContext } from '../..'

import { IInvoiceDetailData } from 'src/@core/models/api/invoice/invoice.interface'
import { GridAccumulate } from '../components/grid-accumulate'

export const Tax = () => {
  const { invoice_detail } = useContext(InvoiceDetailContext) as { invoice_detail: IInvoiceDetailData }

  return <GridAccumulate title='Tax' content={`${invoice_detail.tax}%`} />
}

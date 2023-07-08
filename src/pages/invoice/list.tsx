import { NextPage } from 'next'
import dynamic from 'next/dynamic'

const InvoiceList = dynamic<any>(
  () => import('src/containers/InvoiceContainers/List/InvoiceList').then(mod => mod.InvoiceList),
  {
    ssr: false
  }
)

const InvoiceListPage: NextPage = () => {
  return <InvoiceList />
}

export default InvoiceListPage

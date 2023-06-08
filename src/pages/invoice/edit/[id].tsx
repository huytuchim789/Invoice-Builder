import { NextPage } from 'next'
import dynamic from 'next/dynamic'

const InvoiceEdit = dynamic<any>(() => import('src/containers/InvoiceContainers/Edit').then(mod => mod.InvoiceEdit), {
  ssr: false
})

const InvoiceEditPage: NextPage = () => {
  return <InvoiceEdit />
}

export default InvoiceEditPage

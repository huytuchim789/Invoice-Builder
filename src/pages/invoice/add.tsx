import { NextPage } from 'next'
import dynamic from 'next/dynamic'

const InvoiceAdd = dynamic<any>(() => import('src/containers/InvoiceContainers/Add').then(mod => mod.InvoiceAdd), {
  ssr: false
})

const InvoiceAddPage: NextPage = () => {
  return <InvoiceAdd />
}

export default InvoiceAddPage

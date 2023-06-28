import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'

const InvoiceReview = dynamic<any>(
  () => import('src/containers/InvoiceContainers/Review').then(mod => mod.InvoiceReview),
  {
    ssr: false
  }
)

const InvoiceReviewPage: NextPage = () => {
  return <InvoiceReview />
}

// InvoiceReviewPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default InvoiceReviewPage

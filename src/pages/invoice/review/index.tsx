import { NextPage } from 'next'
import { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { InvoiceReview } from 'src/containers/InvoiceContainers/Review'

const InvoiceReviewPage: NextPage = () => {
  return <InvoiceReview />
}

InvoiceReviewPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default InvoiceReviewPage

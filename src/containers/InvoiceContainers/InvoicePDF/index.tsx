import { Document, Page } from '@react-pdf/renderer'
import { InfoTabPdf } from './info-tab'
import { SendTabPdf } from './send-tab'

const InvoicePDF = () => {
  return (
    <Document>
      <Page>
        <InfoTabPdf />
        <SendTabPdf />
      </Page>
    </Document>
  )
}

export default InvoicePDF

import { View } from '@react-pdf/renderer'

import { EndDatePdf } from './end-date'
import { InvoiceIdPdf } from './invoice-id'
import { StartDatePdf } from './start-date'

export const DateTabPdf = () => {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
      <InvoiceIdPdf />
      <StartDatePdf />
      <EndDatePdf />
    </View>
  )
}

import { View, StyleSheet } from '@react-pdf/renderer'
import { BillTabPdf } from './bill-tab'
import { InvoiceInfoTabPdf } from './invoice-tab'

const sendTabstyle = StyleSheet.create({
  content: {
    display: 'flex',
    padding: '10px',
    borderTop: '1px solid #808080',
    justifyContent: 'space-between'
  }
})

export const SendTabPdf = () => {
  return (
    <View style={sendTabstyle.content}>
      <View>
        <InvoiceInfoTabPdf />
      </View>
      <View>
        <BillTabPdf />
      </View>
    </View>
  )
}

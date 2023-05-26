import { View, StyleSheet } from '@react-pdf/renderer'
import { BillTabPdf } from './bill-tab'
import { InvoiceInfoTabPdf } from './invoice-tab'

const sendTabstyle = StyleSheet.create({
  content: {
    display: 'flex',
    padding: '10px',
    flexDirection: 'row',
    borderTop: '1px solid #808080'
  }
})

export const SendTabPdf = () => {
  return (
    <View style={sendTabstyle.content}>
      <View style={{ flex: 1 }}>
        <InvoiceInfoTabPdf />
      </View>
      <View style={{ flex: 1 }}>
        <BillTabPdf />
      </View>
    </View>
  )
}

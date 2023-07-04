import { View, Text, StyleSheet } from '@react-pdf/renderer'
import { IInvoiceDetailLocalData } from 'src/@core/models/api/invoice/invoice.interface'

const saleTabstyle = StyleSheet.create({
  content: {
    display: 'flex',
    padding: '10px',
    flexDirection: 'column',
    gap: '15px',
    borderTop: '1px solid #808080'
  }
})

const NotePdfInfo = ({ invoice_detail }: { invoice_detail: IInvoiceDetailLocalData }) => {
  return (
    <View style={saleTabstyle.content}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Note:</Text>
      <Text style={{ fontSize: 14 }}>{invoice_detail.note}</Text>
    </View>
  )
}

export default NotePdfInfo

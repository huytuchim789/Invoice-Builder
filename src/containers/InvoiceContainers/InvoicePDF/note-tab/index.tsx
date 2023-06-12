import { View, Text, StyleSheet } from '@react-pdf/renderer'
import { useContext } from 'react'
import { InvoiceDetailPdfContext } from '..'
import { IInvoiceDetailData } from 'src/@core/models/api/invoice/invoice.interface'

const saleTabstyle = StyleSheet.create({
  content: {
    display: 'flex',
    padding: '10px',
    flexDirection: 'column',
    gap: '15px',
    borderTop: '1px solid #808080'
  }
})

export const NotePdfTab = () => {
  const { invoice_detail } = useContext(InvoiceDetailPdfContext) as { invoice_detail: IInvoiceDetailData }

  return (
    <View style={saleTabstyle.content}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Note:</Text>
      <Text style={{ fontSize: 14 }}>{invoice_detail.note}</Text>
    </View>
  )
}

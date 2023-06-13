import { View, Text, StyleSheet } from '@react-pdf/renderer'
import { IInvoiceDetailData } from 'src/@core/models/api/invoice/invoice.interface'
import { useContext } from 'react'
import { InvoiceDetailPdfContext } from '..'

const style = StyleSheet.create({
  content: {
    display: 'flex',
    gap: '10px',
    flexDirection: 'column'
  }
})

export const SalePersonPdf = () => {
  const { invoice_detail } = useContext(InvoiceDetailPdfContext) as { invoice_detail: IInvoiceDetailData }

  return (
    <View style={style.content}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Saleperson:</Text>
      <Text style={{ fontSize: 14 }}>{invoice_detail.sale_person}</Text>
    </View>
  )
}

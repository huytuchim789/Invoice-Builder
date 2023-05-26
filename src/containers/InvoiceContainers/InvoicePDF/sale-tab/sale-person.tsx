import { View, Text, StyleSheet } from '@react-pdf/renderer'
import { IInvoiceDetailData } from 'src/@core/models/api/invoice/invoice.interface'
import { InvoiceDetailPdfContext } from '..'
import { useContext } from 'react'

const style = StyleSheet.create({
  content: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexDirection: 'row'
  }
})

export const SalePersonPdf = () => {
  const { invoice_detail } = useContext(InvoiceDetailPdfContext) as { invoice_detail: IInvoiceDetailData }

  return (
    <View style={style.content}>
      <Text style={{ fontSize: 14 }}>Saleperson:</Text>
      <Text style={{ fontSize: 12 }}>{invoice_detail.sale_person}</Text>
    </View>
  )
}

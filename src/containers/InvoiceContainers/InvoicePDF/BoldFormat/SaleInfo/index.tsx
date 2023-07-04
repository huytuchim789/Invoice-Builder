import { useContext } from 'react'
import { View, StyleSheet, Text } from '@react-pdf/renderer'

import { InvoiceBoldPdfContext } from '../BoldFormat'
import { IInvoiceDetailLocalData } from 'src/@core/models/api/invoice/invoice.interface'
import AccumulateComponent from '../../components/AccumulateComponent'

const saleInfostyle = StyleSheet.create({
  content: {
    display: 'flex',
    padding: '10px',
    flexDirection: 'row',
    borderTop: '1px solid #808080'
  }
})

const salePersonstyle = StyleSheet.create({
  content: {
    display: 'flex',
    gap: '10px',
    flexDirection: 'column'
  }
})

const SaleInfoPdf = () => {
  const { invoice_detail } = useContext(InvoiceBoldPdfContext) as { invoice_detail: IInvoiceDetailLocalData }

  return (
    <View style={saleInfostyle.content}>
      <View style={{ flex: 1 }}>
        <View style={salePersonstyle.content}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Saleperson:</Text>
          <Text style={{ fontSize: 14 }}>{invoice_detail.sale_person}</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <AccumulateComponent
            title='Sub Total'
            content={`${Math.round(invoice_detail.total - (invoice_detail.total * invoice_detail.tax) / 100)}`}
            isTotal={false}
          />
          <AccumulateComponent title='Tax' content={`${invoice_detail.tax}%`} isTotal={false} />
          <AccumulateComponent title='Total' content={`${invoice_detail.total}`} isTotal={true} />
        </View>
      </View>
    </View>
  )
}

export default SaleInfoPdf

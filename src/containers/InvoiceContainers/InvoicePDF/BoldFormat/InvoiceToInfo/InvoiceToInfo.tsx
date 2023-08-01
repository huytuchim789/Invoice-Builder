import { StyleSheet, Text, View, Image } from '@react-pdf/renderer'
import { InvoiceBoldPdfContext } from '../BoldFormat'
import { IInvoiceDetailLocalData } from 'src/@core/models/api/invoice/invoice.interface'
import { useContext } from 'react'
import BillInfoComponent from '../../components/BillInfoComponent'

const invoiceToInfostyle = StyleSheet.create({
  content: {
    fontFamily: 'AlegreyaSans',
    display: 'flex',
    padding: '10px',
    flexDirection: 'row',
    borderTop: '1px solid #808080'
  }
})

const InvoiceToInfo = () => {
  const { invoice_detail } = useContext(InvoiceBoldPdfContext) as { invoice_detail: IInvoiceDetailLocalData }

  return (
    <View style={invoiceToInfostyle.content}>
      <View style={{ flex: 1 }}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Invoice To</Text>
          <br />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 11 }}>{invoice_detail.customer.name}</Text>
          <br />
          <Text style={{ fontSize: 11 }}>{invoice_detail.customer.address}</Text>
          <br />
          <Text style={{ fontSize: 11 }}>{invoice_detail.customer.contact_number}</Text>
          <br />
          <Text style={{ fontSize: 11 }}>{invoice_detail.customer.email}</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View>
          {invoice_detail?.qr_code && (
            <Image src={invoice_detail?.qr_code} style={{ width: 90, height: 90, objectFit: 'cover' }} />
          )}
        </View>
      </View>
    </View>
  )
}

export default InvoiceToInfo

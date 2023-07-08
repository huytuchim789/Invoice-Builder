import { StyleSheet, Text, View } from '@react-pdf/renderer'
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
        <View style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <BillInfoComponent title='Total Due' content='$ 12,110.55' />
          <BillInfoComponent title='Bank Name' content='American Bank' />
          <BillInfoComponent title='Country' content='United States' />
          <BillInfoComponent title='IBAN' content='ETD95476213874685' />
          <BillInfoComponent title='Swift Code' content='BR91905' />
        </View>
      </View>
    </View>
  )
}

export default InvoiceToInfo

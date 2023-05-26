import { View, Text } from '@react-pdf/renderer'
import { useContext } from 'react'
import { InvoiceDetailPdfContext } from '../..'
import { IInvoiceDetailData } from 'src/@core/models/api/invoice/invoice.interface'

export const InvoiceInfoTabPdf = () => {
  const { invoice_detail } = useContext(InvoiceDetailPdfContext) as { invoice_detail: IInvoiceDetailData }

  return (
    <View>
      <View>
        <Text style={{ fontSize: 20 }}>Invoice To</Text>
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
  )
}

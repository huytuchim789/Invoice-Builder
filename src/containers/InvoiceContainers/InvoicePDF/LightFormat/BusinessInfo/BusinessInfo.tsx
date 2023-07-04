import { Image, StyleSheet, Text, View } from '@react-pdf/renderer'
import { useContext } from 'react'
import { IInvoiceDetailLocalData } from 'src/@core/models/api/invoice/invoice.interface'
import { InvoiceLightPdfContext } from '../LightFormat'
import { InfoPdfComponent } from '../../components/InfoComponent'

const infoTabstyle = StyleSheet.create({
  content: {
    display: 'flex',
    padding: '10px',
    flexDirection: 'row',
    height: '100px'
  }
})

const BusinessPdfInfo = () => {
  const { invoice_detail } = useContext(InvoiceLightPdfContext) as { invoice_detail: IInvoiceDetailLocalData }

  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <View style={{ paddingBottom: 10, borderBottom: '1px solid #808080' }}>
        <Image src={invoice_detail.business?.logo_url} style={{ width: 90 }} />
      </View>
      <View style={infoTabstyle.content}>
        <View
          style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
        >
          <Text style={{ fontSize: 16 }}>{invoice_detail.business?.address}</Text>
          <Text style={{ fontSize: 16 }}>{invoice_detail.business?.email}</Text>
          <Text style={{ fontSize: 16 }}>{invoice_detail.business?.phone}</Text>
        </View>
        <View
          style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
        >
          <InfoPdfComponent title='Invoice ID' content={invoice_detail.id} />
          <InfoPdfComponent title='Start Date' content={invoice_detail.created_date} />
          <InfoPdfComponent title='End Date' content={invoice_detail.issued_date} />
        </View>
      </View>
    </View>
  )
}

export default BusinessPdfInfo

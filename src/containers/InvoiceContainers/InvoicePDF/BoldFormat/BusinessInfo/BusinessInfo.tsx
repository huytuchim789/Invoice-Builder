import { Image, StyleSheet, Text, View } from '@react-pdf/renderer'
import { useContext } from 'react'
import { IInvoiceDetailLocalData } from 'src/@core/models/api/invoice/invoice.interface'
import { InvoiceBoldPdfContext } from '../BoldFormat'
import { InfoPdfComponent } from '../../components/InfoComponent'
import { ISetting } from 'src/views/account-settings/store'

const infoTabstyle = StyleSheet.create({
  content: {
    display: 'flex',
    padding: '10px',
    flexDirection: 'row',
    height: '150px'
  }
})

const BusinessInfo = () => {
  const { invoice_detail, settingInfo } = useContext(InvoiceBoldPdfContext) as {
    invoice_detail: IInvoiceDetailLocalData
    settingInfo: ISetting
  }
  // const { info } = useSettingStore()
  return settingInfo ? (
    <View style={infoTabstyle.content}>
      <View style={{ flex: 1 }}>
        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
          <View>
            {settingInfo?.logo_url && (
              <Image src={settingInfo?.logo_url} style={{ width: 90, height: 90, objectFit: 'cover' }} />
            )}
          </View>
          <View style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Text style={{ fontSize: 16 }}>{settingInfo?.address}</Text>
            <Text style={{ fontSize: 16 }}>{settingInfo?.email}</Text>
            <Text style={{ fontSize: 16 }}>{settingInfo?.phone}</Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
          <InfoPdfComponent title='Invoice ID' content={invoice_detail.id} />
          <InfoPdfComponent title='Start Date' content={invoice_detail.created_date} />
          <InfoPdfComponent title='End Date' content={invoice_detail.issued_date} />
        </View>
      </View>
    </View>
  ) : (
    <></>
  )
}

export default BusinessInfo

import { View, Text } from '@react-pdf/renderer'

export const AddressTabPdf = () => {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Invoice</Text>
        <br />
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 14 }}>Office 149, 450 South Brand Brooklyn</Text>
        <br />
        <Text style={{ fontSize: 14 }}>San Diego County, CA 91905, USA</Text>
        <br />
        <Text style={{ fontSize: 14 }}>+1 (123) 456 7891, +44 (876) 543 2198</Text>
      </View>
    </View>
  )
}

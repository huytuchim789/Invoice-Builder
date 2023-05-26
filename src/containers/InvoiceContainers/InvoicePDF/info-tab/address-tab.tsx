import { View, Text } from '@react-pdf/renderer'

export const AddressTabPdf = () => {
  return (
    <>
      <View>
        <Text style={{ fontSize: 20 }}>Invoice</Text>
        <br />
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 11 }}>Office 149, 450 South Brand Brooklyn</Text>
        <br />
        <Text style={{ fontSize: 11 }}>San Diego County, CA 91905, USA</Text>
        <br />
        <Text style={{ fontSize: 11 }}>+1 (123) 456 7891, +44 (876) 543 2198</Text>
      </View>
    </>
  )
}

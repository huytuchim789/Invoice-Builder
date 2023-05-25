import { View, Text } from '@react-pdf/renderer'

export const InvoiceInfoTabPdf = () => {
  return (
    <View>
      <View>
        <Text style={{ fontSize: 20 }}>Invoice To</Text>
        <br />
      </View>
      <View style={{ marginTop: 10 }}>
        <Text>aaaaaaa</Text>
        <br />
        <Text>aaaaaaa</Text>
        <br />
        <Text>aaaaaaa</Text>
      </View>
    </View>
  )
}

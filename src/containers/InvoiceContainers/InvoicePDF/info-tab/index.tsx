import { View, StyleSheet } from '@react-pdf/renderer'
import { DateTabPdf } from './date-tab'
import { AddressTabPdf } from './address-tab'

const infoTabstyle = StyleSheet.create({
  content: {
    display: 'flex',
    padding: '10px',
    flexDirection: 'row',
    height: '100px'
  }
})

export const InfoTabPdf = () => {
  return (
    <View style={infoTabstyle.content}>
      <View style={{ flex: 1 }}>
        <AddressTabPdf />
      </View>
      <View style={{ flex: 1 }}>
        <DateTabPdf />
      </View>
    </View>
  )
}

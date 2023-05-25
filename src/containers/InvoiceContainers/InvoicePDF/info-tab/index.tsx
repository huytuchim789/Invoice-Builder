import { View, StyleSheet } from '@react-pdf/renderer'
import { DateTabPdf } from './date-tab'
import { AddressTabPdf } from './address-tab'

const infoTabstyle = StyleSheet.create({
  content: {
    display: 'flex',
    padding: '10px',
    justifyContent: 'space-between',
    flexWrap: 'nowrap'
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

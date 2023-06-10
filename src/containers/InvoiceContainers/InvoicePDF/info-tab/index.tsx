import { View, StyleSheet, Font } from '@react-pdf/renderer'
import { DateTabPdf } from './date-tab'
import { AddressTabPdf } from './address-tab'

Font.register({
  family: 'Poppins',
  fonts: [
    {
      src: '/fonts/Poppins-ExtraLight.ttf'
    }
  ]
})

const infoTabstyle = StyleSheet.create({
  content: {
    fontFamily: 'Poppins',
    display: 'flex',
    padding: '10px',
    flexDirection: 'row'
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

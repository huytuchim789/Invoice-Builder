import { View, StyleSheet, Font } from '@react-pdf/renderer'

import { SalePersonPdf } from './sale-person'
import { AccumulatePdfTab } from './accumulate-tab'

Font.register({
  family: 'Poppins',
  fonts: [
    {
      src: '/fonts/Poppins-ExtraLight.ttf'
    }
  ]
})

const saleTabstyle = StyleSheet.create({
  content: {
    fontFamily: 'Poppins',
    display: 'flex',
    padding: '10px',
    flexDirection: 'row',
    borderTop: '1px solid #808080'
  }
})

export const SalePdfTab = () => {
  return (
    <View style={saleTabstyle.content}>
      <View style={{ flex: 1 }}>
        <SalePersonPdf />
      </View>
      <View style={{ flex: 1 }}>
        <AccumulatePdfTab />
      </View>
    </View>
  )
}

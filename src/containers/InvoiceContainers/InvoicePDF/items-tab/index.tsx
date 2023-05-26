import { View, StyleSheet } from '@react-pdf/renderer'
import { TableTabPdf } from './table-tab'

const itemsTabstyle = StyleSheet.create({
  content: {
    display: 'flex',
    padding: '10px',
    flexDirection: 'row',
    borderTop: '1px solid #808080'
  }
})

export const ItemsTabPdf = () => {
  return (
    <View style={itemsTabstyle.content}>
      <TableTabPdf />
    </View>
  )
}

import { View } from '@react-pdf/renderer'
import { ItemPdfCell } from './item-cell'
import { DescriptionPdfCell } from './description-cell'
import { CostPdfCell } from './cost-cell'
import { HoursPdfCell } from './hour-cell'
import { PricePdfCell } from './price-cell'

export const ItemContentPdf = () => {
  return (
    <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
      <View style={{ minWidth: 150, padding: '10px' }}>
        <ItemPdfCell />
      </View>
      <View style={{ minWidth: 250, padding: '10px' }}>
        <DescriptionPdfCell />
      </View>
      <View style={{ minWidth: 50, padding: '10px' }}>
        <CostPdfCell />
      </View>
      <View style={{ minWidth: 50, padding: '10px' }}>
        <HoursPdfCell />
      </View>
      <View style={{ minWidth: 100, padding: '10px' }}>
        <PricePdfCell />
      </View>
    </View>
  )
}

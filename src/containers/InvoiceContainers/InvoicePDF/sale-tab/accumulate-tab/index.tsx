import { View } from '@react-pdf/renderer'

import { SubTotalPdf } from './sub-total'
import { TaxPdf } from './tax'
import { TotalPdf } from './total'

export const AccumulatePdfTab = () => {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <SubTotalPdf />
      <TaxPdf />
      <TotalPdf />
    </View>
  )
}

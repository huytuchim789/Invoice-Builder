import { View } from '@react-pdf/renderer'

import { TableHeaderPdf } from './table-header'
import { TableBodyPdf } from './table-body'

export const TableTabPdf = () => {
  return (
    <View>
      <TableHeaderPdf />
      <TableBodyPdf />
    </View>
  )
}

import { useContext } from 'react'
import { Text } from '@react-pdf/renderer'

import { ItemPdfContext } from '../table-body'

import { IItemsData } from 'src/@core/models/api/invoice/invoice.interface'

export const HoursPdfCell = () => {
  const { data } = useContext(ItemPdfContext) as { data: IItemsData }

  return <Text style={{ fontSize: 12 }}>{data.hours}</Text>
}

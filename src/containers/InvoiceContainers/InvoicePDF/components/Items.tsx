import { Text, View } from '@react-pdf/renderer'
import { useMemo } from 'react'

import { IItemContent } from 'src/@core/components/Invoice/ItemInfo/store'

const ItemPdf = ({ item }: { item: IItemContent }) => {
  const itemString = useMemo(() => {
    if (!item.value) return { price: 0 }
    return JSON.parse(item.value)
  }, [item])

  return (
    <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
      <View style={{ minWidth: 150, padding: '10px' }}>
        <Text style={{ fontSize: 12 }}>{itemString.name}</Text>
      </View>
      <View style={{ minWidth: 250, padding: '10px' }}>
        <Text style={{ fontSize: 12 }}>{item.description}</Text>
      </View>
      <View style={{ minWidth: 50, padding: '10px' }}>
        <Text style={{ fontSize: 12 }}>{itemString.price}</Text>
      </View>
      <View style={{ minWidth: 50, padding: '10px' }}>
        <Text style={{ fontSize: 12 }}>{item.hours}</Text>
      </View>
      <View style={{ minWidth: 100, padding: '10px' }}>
        <Text style={{ fontSize: 12 }}>{itemString.price * item.hours}</Text>
      </View>
    </View>
  )
}

export default ItemPdf

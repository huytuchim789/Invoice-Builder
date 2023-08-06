import { Text, View } from '@react-pdf/renderer'
// import { useMemo } from 'react'

import { IItemContent } from 'src/@core/components/Invoice/ItemInfo/store'

const ItemPdf = ({ item }: { item: IItemContent }) => {

  return (
    <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
      <View style={{ minWidth: 100, padding: '10px' }}>
        <Text style={{ fontSize: 12 }}>{item?.name}</Text>
      </View>
      <View style={{ minWidth: 100, padding: '10px' }}>
        <Text style={{ fontSize: 12 }}>{item?.pivot?.description}</Text>
      </View>
      <View style={{ minWidth: 50, padding: '10px' }}>
        <Text style={{ fontSize: 12 }}>{item?.price}</Text>
      </View>
      <View style={{ minWidth: 50, padding: '10px' }}>
        <Text style={{ fontSize: 12 }}>{item?.pivot?.cost}</Text>
      </View>
      <View style={{ minWidth: 50, padding: '10px' }}>
        <Text style={{ fontSize: 12 }}>{item?.pivot?.hours}</Text>
      </View>
      <View style={{ minWidth: 50, padding: '10px' }}>
        <Text style={{ fontSize: 12 }}>{calPrice(item?.pivot?.hours,item.price,item.pivot?.cost) || ''}</Text>
      </View>
    </View>
  )
}
const calPrice = (hours:number,price:number,quantity:number) => {
  return hours * price * quantity
}
export default ItemPdf

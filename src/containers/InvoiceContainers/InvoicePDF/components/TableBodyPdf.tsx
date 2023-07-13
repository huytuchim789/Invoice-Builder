import React from 'react'
import { View } from '@react-pdf/renderer'

// ** Types Import
import { IInvoiceDetailLocalData } from 'src/@core/models/api/invoice/invoice.interface'
import { IItemContent } from 'src/@core/components/Invoice/ItemInfo/store'
import ItemPdf from './Items'

export const ItemPdfContext = React.createContext({})

export const TableBodyPdf = ({ invoice_detail }: { invoice_detail: IInvoiceDetailLocalData }) => {
  return (
    <View style={{ width: '100%' }}>
      {invoice_detail.items.map((item: IItemContent, index: number) => (
        <ItemPdfContext.Provider value={{ data: item, count: index }} key={`${item.name}-${index}`}>
          <ItemPdf item={item} />
        </ItemPdfContext.Provider>
      ))}
    </View>
  )
}

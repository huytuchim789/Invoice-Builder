import React, { useContext } from 'react'
import { View } from '@react-pdf/renderer'

import { ItemContentPdf } from './items'
import { InvoiceDetailPdfContext } from '../..'

// ** Types Import
import { IInvoiceDetailData, IItemsData } from 'src/@core/models/api/invoice/invoice.interface'

export const ItemPdfContext = React.createContext({})

export const TableBodyPdf = () => {
  const { invoice_detail } = useContext(InvoiceDetailPdfContext) as { invoice_detail: IInvoiceDetailData }

  return (
    <View>
      {invoice_detail.items.map((item: IItemsData, index: number) => (
        <ItemPdfContext.Provider value={{ data: item, count: index }} key={`${item.name}-${index}`}>
          <ItemContentPdf />
        </ItemPdfContext.Provider>
      ))}
    </View>
  )
}

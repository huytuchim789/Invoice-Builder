import React from 'react'

import { TableBody } from '@mui/material'
import { ItemContent } from './item'
import { useInvoiceAddStore } from '../../store'
import { IItemContent } from '../store'

export const ItemContext = React.createContext({})

export const TableBodyContent = () => {
  const { itemContent } = useInvoiceAddStore((state: any) => state.itemContentTabStore)

  return (
    <TableBody>
      {itemContent.map((item: IItemContent, index: number) => (
        <ItemContext.Provider value={{ data: item, count: index }} key={`${item.content}-${index}`}>
          <ItemContent />
        </ItemContext.Provider>
      ))}
    </TableBody>
  )
}

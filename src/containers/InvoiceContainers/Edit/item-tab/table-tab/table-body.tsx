import { TableBody } from '@mui/material'
import { ItemContent } from './item'
import React from 'react'
import { useInvoiceEditStore } from '../../store'
import { IItemContent } from '../store'

export const ItemEditContext = React.createContext({})

export const TableBodyContent = () => {
  const { itemContent } = useInvoiceEditStore((state: any) => state.itemContentTabStore)

  return (
    <TableBody>
      {itemContent.map((item: IItemContent, index: number) => (
        <ItemEditContext.Provider value={{ data: item, count: index }} key={`${item.name}-${index}`}>
          <ItemContent />
        </ItemEditContext.Provider>
      ))}
    </TableBody>
  )
}

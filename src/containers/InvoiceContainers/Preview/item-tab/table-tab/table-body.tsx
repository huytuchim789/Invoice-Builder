import React, { useContext } from 'react'

import { TableBody } from '@mui/material'

import { ItemContent } from './item'
import { InvoiceDetailContext } from '../..'

import { IInvoiceDetailData, IItemsData } from 'src/@core/models/api/invoice/invoice.interface'

export const ItemContext = React.createContext({})

export const TableBodyContent = () => {
  const { invoice_detail } = useContext(InvoiceDetailContext) as { invoice_detail: IInvoiceDetailData }

  return (
    <TableBody>
      {invoice_detail.items.map((item: IItemsData, index: number) => (
        <ItemContext.Provider value={{ data: item, count: index }} key={`${item.name}-${index}`}>
          <ItemContent />
        </ItemContext.Provider>
      ))}
    </TableBody>
  )
}

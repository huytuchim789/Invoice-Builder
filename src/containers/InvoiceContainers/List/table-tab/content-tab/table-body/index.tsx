import { useContext, createContext } from 'react'

import { TableBody } from '@mui/material'
import { InvoiceListContext } from '../../..'
import { IInvoiceData, IInvoiceDetailData } from 'src/@core/models/api/invoice/invoice.interface'
import { ItemContent } from './item'

export const ItemContext = createContext({})

export const TableBodyContent = () => {
  const { data } = useContext(InvoiceListContext) as { data: IInvoiceData }

  return (
    <TableBody>
      {data &&
        data.data.map((item: IInvoiceDetailData, index: number) => (
          <ItemContext.Provider value={{ data: item, count: index }} key={`${item.id}-${index}`}>
            <ItemContent />
          </ItemContext.Provider>
        ))}
    </TableBody>
  )
}

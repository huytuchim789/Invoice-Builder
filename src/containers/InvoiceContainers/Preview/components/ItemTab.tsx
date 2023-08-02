import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { ReactElement, useContext } from 'react'
import { IInvoiceDetailData } from 'src/@core/models/api/invoice/invoice.interface'
import { InvoiceDetailContext } from '..'

export interface Column {
  id: string
  label: string
  minWidth?: number
  align?: 'right'
  formatString?: (value: string) => ReactElement
  formatNumber?: (value: number) => ReactElement
}

export interface IListItems {
  key: string
  pivot?: boolean
}

const columns: readonly Column[] = [
  { id: 'item', label: 'item', minWidth: 200 },
  { id: 'description', label: 'description', minWidth: 300 },
  { id: 'cost', label: 'cost', minWidth: 50 },
  { id: 'quantity', label: 'quantity', minWidth: 50 },
  {
    id: 'hours',
    label: 'Hours',
    minWidth: 50
  },
  {
    id: 'price',
    label: 'Price',
    minWidth: 50
  }
]

const listItems: IListItems[] = [
  {
    key: 'name'
  },
  {
    key: 'description',
    pivot: true
  },
  {
    key: 'price'
  },
  {
    key: 'cost',
    pivot: true
  },
  {
    key: 'hours',
    pivot: true
  }
]

const ItemTab = () => {
  const { invoice_detail } = useContext(InvoiceDetailContext) as { invoice_detail: IInvoiceDetailData }

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label={'Okok'}>
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {invoice_detail.items.map((item: any) => {
            return (
              <TableRow key={item.id}>
                {listItems.map((column: IListItems) => {
                  return (
                    <TableCell key={column.key}>
                      <Typography>{column.pivot ? item.pivot[column.key] : item[column.key]}</Typography>
                    </TableCell>
                  )
                })}
                <TableCell>
                  <Typography>{(item.price * item.pivot.cost * item.pivot.hours).toFixed(2)}</Typography>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ItemTab

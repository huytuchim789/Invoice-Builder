import { TableHead, TableRow, TableCell } from '@mui/material'

import { Column } from './ItemInfo'

const columns: readonly Column[] = [
  { id: 'item', label: 'item', minWidth: 300 },
  { id: 'cost', label: 'cost', minWidth: 100 },
  { id: 'quantity', label: 'Quantity', minWidth: 100 },
  {
    id: 'hours',
    label: 'Hours',
    minWidth: 100
  },
  {
    id: 'price',
    label: 'Price',
    minWidth: 100
  },
  {
    id: 'action',
    label: '',
    minWidth: 50
  }
]

const TableHeaderItem = () => {
  return (
    <TableHead>
      <TableRow>
        {columns.map(column => (
          <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default TableHeaderItem

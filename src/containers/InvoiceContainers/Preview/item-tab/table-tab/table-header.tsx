import { ReactElement } from 'react'

import { TableHead, TableRow, TableCell } from '@mui/material'

export interface Column {
  id: string
  label: string
  minWidth?: number
  align?: 'right'
  formatString?: (value: string) => ReactElement
  formatNumber?: (value: number) => ReactElement
}

const columns: readonly Column[] = [
  { id: 'item', label: 'item', minWidth: 200 },
  { id: 'description', label: 'description', minWidth: 300 },
  { id: 'cost', label: 'cost', minWidth: 50 },
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

export const TableHeader = () => {
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

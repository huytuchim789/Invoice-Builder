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
  { id: 'item', label: '#', minWidth: 300 },
  { id: 'client', label: 'Client', minWidth: 100 },
  {
    id: 'total',
    label: 'Total',
    minWidth: 100
  },
  {
    id: 'issue_date',
    label: 'Issue Date',
    minWidth: 100
  },
  {
    id: 'balance',
    label: 'Balance',
    minWidth: 50
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 100
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

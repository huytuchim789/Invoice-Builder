import { TableRow, TableCell } from '@mui/material'

import { InvoiceIdCell } from './invoice-id'
import { StatusCell } from './status'
import { ClientCell } from './client'
import { IssueDateCell } from './issue-date'
import { ActionCell } from './action'
import { TotalCell } from './total'

export const ItemContent = () => {
  return (
    <TableRow style={{ alignItems: 'start' }}>
      <TableCell>
        <InvoiceIdCell />
      </TableCell>
      <TableCell>
        <StatusCell />
      </TableCell>
      <TableCell>
        <ClientCell />
      </TableCell>
      <TableCell>
        <TotalCell />
      </TableCell>
      <TableCell>
        <IssueDateCell />
      </TableCell>
      <TableCell>
        <ActionCell />
      </TableCell>
    </TableRow>
  )
}

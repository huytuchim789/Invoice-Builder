import { ReactElement } from 'react'

import { Table, TableContainer } from '@mui/material'
import { TableHeader } from './table-header'

export interface Column {
  id: string
  label: string
  minWidth?: number
  align?: 'right'
  formatString?: (value: string) => ReactElement
  formatNumber?: (value: number) => ReactElement
}

export const TableItem = () => {
  return (
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label={'Okok'}>
        <TableHeader />
      </Table>
    </TableContainer>
  )
}

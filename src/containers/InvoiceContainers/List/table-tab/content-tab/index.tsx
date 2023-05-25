import { Table, TableContainer } from '@mui/material'
import { TableHeader } from './table-header'
import { TableBodyContent } from './table-body'

export const ContentTab = () => {
  return (
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table>
        <TableHeader />
        <TableBodyContent />
      </Table>
    </TableContainer>
  )
}

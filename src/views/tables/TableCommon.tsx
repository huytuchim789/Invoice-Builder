import { ChangeEvent } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

// ** Interface Imports
import { ColumnNews } from 'src/pages/pages/news'
import { NewsListData, NewsListDataResponse } from 'src/@core/models/api/news'

interface Props {
  title: string
  columns: readonly ColumnNews[]
  data: NewsListDataResponse
  handleChangePage: (event: unknown, newPage: number) => void
  handleChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement>) => void
}

const TableCommon = ({ columns, data, title, handleChangePage, handleChangeRowsPerPage }: Props) => {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label={title}>
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
            {data.data.map((column: NewsListData) => {
              return (
                <TableRow key={column.id} hover role='checkbox' tabIndex={-1}>
                  <TableCell>{column.id}</TableCell>
                  <TableCell>{column.title}</TableCell>
                  <TableCell>
                    <img width={300} height={300} src={column.image} alt={column.title} />
                  </TableCell>
                  <TableCell>{column.view}</TableCell>
                  <TableCell>{column.content}</TableCell>
                  <TableCell>{column.day}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20]}
        component='div'
        count={data.data.length}
        rowsPerPage={data.pagination.limit}
        page={data.pagination.startPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default TableCommon

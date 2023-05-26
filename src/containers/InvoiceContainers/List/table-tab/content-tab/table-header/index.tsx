import { Typography, Box, Link } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { ActionTab } from './action-tab'

export const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: '#',
    width: 350,
    renderCell(params) {
      return <Link href={`/invoice/preview/${params.row.id}`}>{params.row.id}</Link>
    }
  },
  {
    field: 'customer',
    headerName: 'Client',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 300,
    renderCell(params) {
      return (
        <Box>
          <Typography fontSize={12}>{params.row.customer.name}</Typography>
          <Typography fontSize={12}>{params.row.customer.email}</Typography>
        </Box>
      )
    }
  },
  { field: 'issued_date', headerName: 'Issued Date', width: 230 },
  {
    field: 'total',
    headerName: 'Total Amount',
    type: 'number',
    headerAlign: 'center',
    align: 'center',
    width: 250,
    renderCell(params) {
      return <Typography textAlign='center'>${params.row.total}</Typography>
    }
  },
  {
    field: '',
    headerName: 'Actions',
    headerAlign: 'center',
    align: 'center',
    width: 200,
    renderCell(params) {
      return <ActionTab id={params.row.id} />
    }
  }
]

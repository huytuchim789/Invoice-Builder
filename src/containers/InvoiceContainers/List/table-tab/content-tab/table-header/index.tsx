import { Typography, Box } from '@mui/material'
import { ActionTab } from './action-tab'
import { InvoiceIdTab } from './invoice-id'

export const columns: any[] = [
  {
    field: 'id',
    headerName: '#',
    width: 350,
    renderCell(params: any) {
      return <InvoiceIdTab params={params} />
    }
  },
  { field: 'status', headerName: 'Status', width: 100 },
  {
    field: 'customer',
    headerName: 'Client',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 300,
    renderCell(params: any) {
      return (
        <Box>
          <Typography fontSize={12}>{params.row.invoice.customer.name}</Typography>
          <Typography fontSize={12}>{params.row.invoice.customer.email}</Typography>
        </Box>
      )
    }
  },
  { field: 'created_at', headerName: 'Issued Date', width: 230 },
  {
    field: '',
    headerName: 'Actions',
    headerAlign: 'center',
    align: 'center',
    width: 200,
    renderCell(params: any) {
      return <ActionTab id={params.row.id} />
    }
  }
]

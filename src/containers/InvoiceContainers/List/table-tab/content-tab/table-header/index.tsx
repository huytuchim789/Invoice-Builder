import { Typography } from '@mui/material'

import { ActionTab } from './action-tab'
import { InvoiceIdTab } from './invoice-id'

import extendedDayJs from 'src/@core/utils/dayjs'
import { ClientCell } from './client'
import { StatusCell } from './status'

export const columns: any[] = [
  {
    field: 'id',
    headerName: '#',
    width: 300,
    renderCell(params: any) {
      return <InvoiceIdTab params={params} />
    }
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 100,
    renderCell(params: any) {
      return <StatusCell params={params} />
    }
  },
  {
    field: 'customer',
    headerName: 'Client',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    flex: 1,
    renderCell(params: any) {
      return <ClientCell params={params} />
    }
  },
  {
    field: 'total',
    headerName: 'Total',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 150,
    renderCell(params: any) {
      return <Typography>$ {params.row.invoice.total}</Typography>
    }
  },
  {
    field: 'created_at',
    headerName: 'Created At',
    width: 120,
    renderCell(params: any) {
      return <Typography>{extendedDayJs(params.row.invoice.created_at).format('YYYY-MM-DD')}</Typography>
    }
  },
  {
    field: 'issued_date',
    headerName: 'Issued Date',
    width: 120,
    renderCell(params: any) {
      return <Typography>{extendedDayJs(params.row.invoice.issued_date).format('YYYY-MM-DD')}</Typography>
    }
  },
  {
    field: '',
    headerName: 'Actions',
    headerAlign: 'center',
    align: 'center',
    renderCell(params: any) {
      return <ActionTab params={params} />
    }
  }
]

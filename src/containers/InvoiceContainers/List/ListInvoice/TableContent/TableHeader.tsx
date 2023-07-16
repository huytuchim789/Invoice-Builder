import { Chip, Typography } from '@mui/material'

import extendedDayJs from 'src/@core/utils/dayjs'
import { ITableCommonHeader } from 'src/@core/models/common'

import InvoiceIdCell from './TableHeader/InvoiceIdCell'
import StatusCell from './TableHeader/StatusCell'
import ClientCell from './TableHeader/ClientCell'
import ActionCell from './TableHeader/ActionCell'

export const columns: ITableCommonHeader[] = [
  {
    field: 'id',
    headerName: '#',
    component: (params: any) => {
      return <InvoiceIdCell params={params} />
    }
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 100,
    component: (params: any) => {
      return <StatusCell params={params} />
    }
  },
  {
    field: 'customer',
    headerName: 'Client',
    customStyle: {
      flex: 1
    },
    component: (params: any) => {
      return <ClientCell params={params} />
    }
  },
  {
    field: 'total',
    headerName: 'Total',
    width: 150,
    component: (params: any) => {
      return params?.invoice?.is_paid ? (
        <Chip
          label={`Paid`}
          color={'success'}
          sx={{
            height: 24,
            fontSize: '0.75rem',
            textTransform: 'capitalize',
            '& .MuiChip-label': { fontWeight: 500 }
          }}
        />
      ) : (
        <Typography>$ {params.invoice.total}</Typography>
      )
    }
  },
  {
    field: 'created_at',
    headerName: 'Created At',
    width: 150,
    component: (params: any) => {
      return <Typography>{extendedDayJs(params.invoice.created_at).format('YYYY-MM-DD')}</Typography>
    }
  },
  {
    field: 'issued_date',
    headerName: 'Issued Date',
    width: 150,
    component: (params: any) => {
      return <Typography>{extendedDayJs(params.invoice.issued_date).format('YYYY-MM-DD')}</Typography>
    }
  },
  {
    field: '',
    headerName: 'Actions',
    textAlign: 'center',
    component: (params: any) => {
      return <ActionCell params={params} />
    }
  }
]

import { Typography } from '@mui/material'

import { ActionTab } from './action-tab'
import { InvoiceIdTab } from './invoice-id'

import extendedDayJs from 'src/@core/utils/dayjs'
import { ClientCell } from './client'
import { StatusCell } from './status'
import { ITableCommonHeader } from 'src/@core/models/common'

export const columns: ITableCommonHeader[] = [
  {
    field: 'id',
    headerName: '#',
    component: (params: any) => {
      return <InvoiceIdTab params={params} />
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
      return <Typography>$ {params.invoice.total}</Typography>
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
      return <ActionTab params={params} />
    }
  }
]

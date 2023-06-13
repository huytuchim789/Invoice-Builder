import { Typography } from '@mui/material'

import extendedDayJs from 'src/@core/utils/dayjs'
import { ActionTab } from '../actions-tab'
import { IUserSelectInvoiceTo } from 'src/@core/models/api/invoice/invoice.interface'
import { GridColDef } from '@mui/x-data-grid'

interface Params {
  row: IUserSelectInvoiceTo
}

export const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: '#',
    width: 250,
    renderCell(params: Params) {
      return <Typography>{params.row.id}</Typography>
    }
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    renderCell(params: Params) {
      return <Typography>{params.row.name}</Typography>
    }
  },
  {
    field: 'company',
    headerName: 'Company',
    width: 150,
    renderCell(params: Params) {
      return <Typography>{params.row.company}</Typography>
    }
  },
  {
    field: 'country',
    headerName: 'Country',
    width: 150,
    renderCell(params: Params) {
      return <Typography>{params.row.country}</Typography>
    }
  },
  {
    field: 'contact_number',
    headerName: 'Contact Number',
    width: 200,
    renderCell(params: Params) {
      return <Typography>{params.row.contact_number}</Typography>
    }
  },
  {
    field: 'created_at',
    headerName: 'Created At',
    width: 200,
    renderCell(params: Params) {
      return <Typography>{extendedDayJs(params.row.created_at).format('YYYY-MM-DD')}</Typography>
    }
  },
  {
    field: '',
    headerName: 'Actions',
    headerAlign: 'center',
    align: 'center',
    renderCell(params: Params) {
      return <ActionTab params={params.row} />
    }
  }
]

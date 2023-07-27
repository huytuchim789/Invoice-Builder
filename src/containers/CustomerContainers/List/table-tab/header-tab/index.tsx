import { Typography } from '@mui/material'

import extendedDayJs from 'src/@core/utils/dayjs'
import { ActionTab } from '../actions-tab'
import { ITableCommonHeader } from 'src/@core/models/common'

export const columns: ITableCommonHeader[] = [
  {
    field: 'email',
    headerName: '#',
    width: 250,
    component: (params: any) => {
      return <Typography>{params.email}</Typography>
    }
  },
  {
    field: 'name',
    headerName: 'Name',
    customStyle: {
      flex: 1
    },
    component: (params: any) => {
      return <Typography>{params.name}</Typography>
    }
  },
  {
    field: 'company',
    headerName: 'Company',
    width: 150,
    component: (params: any) => {
      return <Typography>{params.company}</Typography>
    }
  },
  {
    field: 'country',
    headerName: 'Country',
    width: 150,
    component: (params: any) => {
      return <Typography>{params.country}</Typography>
    }
  },
  {
    field: 'contact_number',
    headerName: 'Contact Number',
    width: 200,
    component: (params: any) => {
      return <Typography>{params.contact_number}</Typography>
    }
  },
  {
    field: 'created_at',
    headerName: 'Created At',
    width: 200,
    component: (params: any) => {
      return <Typography>{extendedDayJs(params.created_at).format('YYYY-MM-DD')}</Typography>
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

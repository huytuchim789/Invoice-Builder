import { FormControl, Select, MenuItem, InputLabel } from '@mui/material'

import { IInvoiceStatus } from 'src/@core/models/status.interface'
import { useInvoiceStatusStore } from './store'
import { useRouter } from 'next/router'

interface IItemSelect {
  name: string
  value: IInvoiceStatus
}

const ItemSelects: IItemSelect[] = [
  {
    name: 'None',
    value: ''
  },
  {
    name: 'Draft',
    value: 'draft'
  },
  {
    name: 'Sent',
    value: 'sent'
  },
  {
    name: 'Failed',
    value: 'failed'
  }
]

const InvoiceStatusFilter = () => {
  const router = useRouter()
  const { invoiceStatus, setInvoiceStatus } = useInvoiceStatusStore()

  const handleChangeInvoiceStatus = (status: string) => {
    setInvoiceStatus(status)
    router.push({
      pathname: '/invoice/list',
      query: {
        ...router.query,
        status
      }
    })
  }

  return (
    <FormControl variant='outlined' fullWidth>
      <InputLabel id='demo-simple-select-label'>{'Invoice Status'}</InputLabel>
      <Select
        label='Invoice Status'
        defaultValue={invoiceStatus}
        fullWidth
        labelId='demo-simple-select-label'
        id='demo-simple-select'
      >
        {ItemSelects.map((item: IItemSelect, index: number) => (
          <MenuItem
            value={item.value}
            key={`${item.name}-${index}`}
            onClick={() => handleChangeInvoiceStatus(item.value)}
          >
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default InvoiceStatusFilter

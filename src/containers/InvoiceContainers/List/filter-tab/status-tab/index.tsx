import { FormControl, Select, MenuItem, InputLabel } from '@mui/material'
import { IInvoiceStatus } from 'src/@core/models/status.interface'
import { useListInvoiceStore } from '../../store'

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

export const InvoiceStatusFilter = () => {
  const { invoiceStatus, setInvoiceStatus } = useListInvoiceStore((state: any) => state.invoiceStatusStore)

  const handleChangeInvoiceStatus = (status: string) => {
    setInvoiceStatus(status)
  }

  return (
    <FormControl variant='outlined' fullWidth>
      <InputLabel id='demo-simple-select-label'>{invoiceStatus ? invoiceStatus : 'Invoice Status'}</InputLabel>
      <Select label='Invoice Status' fullWidth labelId='demo-simple-select-label' id='demo-simple-select'>
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

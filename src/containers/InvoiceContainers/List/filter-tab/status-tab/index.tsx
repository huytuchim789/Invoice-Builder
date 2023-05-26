import { FormControl, Select, MenuItem } from '@mui/material'

interface IItemSelect {
  name: string
  value: string
}

const ItemSelects: IItemSelect[] = [
  {
    name: 'None',
    value: ''
  },
  {
    name: 'Downloaded',
    value: 'dowloaded'
  },
  {
    name: 'Draft',
    value: 'draft'
  },
  {
    name: 'Paid',
    value: 'paid'
  },
  {
    name: 'Partial Payment',
    value: 'partial payment'
  },
  {
    name: 'Past Due',
    value: 'past due'
  },
  {
    name: 'Sent',
    value: 'sent'
  }
]

export const InvoiceStatusFilter = () => {
  return (
    <FormControl variant='outlined' fullWidth>
      <Select
        label='Invoice Status'
        fullWidth
        labelId='demo-simple-select-outlined-label'
        id='demo-simple-select-outlined'
        size='small'
      >
        {ItemSelects.map((item: IItemSelect, index: number) => (
          <MenuItem value={item.value} key={`${item.name}-${index}`}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

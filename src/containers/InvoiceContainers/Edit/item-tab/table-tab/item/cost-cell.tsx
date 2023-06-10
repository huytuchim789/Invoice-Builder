import { TextField } from '@mui/material'
import { useEditItemInvoice } from '../component'

export const CostCell = () => {
  const { data, handleEditItem } = useEditItemInvoice()

  return (
    <TextField
      sx={{ width: '150px' }}
      defaultValue={data.cost}
      type='number'
      size='small'
      variant='outlined'
      value={data.cost}
      onChange={handleEditItem('cost')}
    />
  )
}

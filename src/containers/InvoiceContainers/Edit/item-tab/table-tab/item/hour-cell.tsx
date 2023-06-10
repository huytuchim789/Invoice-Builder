import { TextField } from '@mui/material'
import { useEditItemInvoice } from '../component'

export const HourCell = () => {
  const { data, handleEditItem } = useEditItemInvoice()

  return (
    <TextField
      type='number'
      onChange={handleEditItem('hours')}
      value={data.hours}
      sx={{ width: '150px' }}
      size='small'
      variant='outlined'
    />
  )
}

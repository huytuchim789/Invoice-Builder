import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material'
import { useInvoicePreviewStore } from '../store'

export const AcceptPaymentSelect = () => {
  const { setMethod } = useInvoicePreviewStore(state => state.paymentMethodStore)

  const handleChangePaymentMethod = (event: SelectChangeEvent<string>) => {
    setMethod(event.target.value)
  }

  return (
    <FormControl variant='outlined' sx={{ minWidth: 120, width: '100%' }}>
      <InputLabel id='demo-simple-select-outlined-label'>Sending Method</InputLabel>
      <Select
        fullWidth
        labelId='demo-simple-select-outlined-label'
        id='demo-simple-select-outlined'
        defaultValue='web'
        label='Sending Method'
        aria-label='Sending Method'
        onChange={handleChangePaymentMethod}
      >
        <MenuItem value={'mail'}>Email Sending</MenuItem>
        <MenuItem value={'web'}>Web Sending</MenuItem>
      </Select>
    </FormControl>
  )
}

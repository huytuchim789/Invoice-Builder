import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material'
import { useSendingMethodStore } from './store'

interface Props {
  handleOpenMailModal: () => void
}

const SendingMethodSelect = ({ handleOpenMailModal }: Props) => {
  const { method, setMethod } = useSendingMethodStore()

  const handleChangePaymentMethod = (event: SelectChangeEvent<'web' | 'mail'>) => {
    setMethod(event.target.value as 'web' | 'mail')

    if (event.target.value === 'mail') handleOpenMailModal()
  }

  return (
    <FormControl variant='outlined' sx={{ minWidth: 120, width: '100%' }}>
      <InputLabel id='demo-simple-select-outlined-label'>Sending Method</InputLabel>
      <Select
        fullWidth
        labelId='demo-simple-select-outlined-label'
        id='demo-simple-select-outlined'
        value={method}
        label='Sending Method'
        aria-label='Sending Method'
        onChange={handleChangePaymentMethod}
      >
        <MenuItem value='web'>Web Sending</MenuItem>
        <MenuItem value='mail'>Email Sending</MenuItem>
      </Select>
    </FormControl>
  )
}

export default SendingMethodSelect

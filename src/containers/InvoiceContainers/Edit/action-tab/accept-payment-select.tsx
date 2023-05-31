import { Select, MenuItem, FormControl, InputLabel } from '@mui/material'

export const AcceptPaymentSelect = () => {
  return (
    <FormControl variant='outlined' sx={{ minWidth: 120, width: '100%' }}>
      <InputLabel id='demo-simple-select-outlined-label'>Sending Method</InputLabel>
      <Select
        fullWidth
        labelId='demo-simple-select-outlined-label'
        id='demo-simple-select-outlined'
        defaultValue={10}
        label='Sending Method'
        aria-label='Sending Method'
      >
        <MenuItem value={10}>Email Sending</MenuItem>
        <MenuItem value={11}>Web Sending</MenuItem>
      </Select>
    </FormControl>
  )
}

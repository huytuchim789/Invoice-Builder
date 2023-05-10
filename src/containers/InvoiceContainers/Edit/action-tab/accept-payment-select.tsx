import { Select, MenuItem, FormControl, InputLabel } from '@mui/material'

export const AcceptPaymentSelect = () => {
  return (
    <FormControl variant='outlined' sx={{ minWidth: 120, width: '100%' }}>
      <InputLabel id='demo-simple-select-outlined-label'>Accept payments via</InputLabel>
      <Select
        fullWidth
        labelId='demo-simple-select-outlined-label'
        id='demo-simple-select-outlined'
        defaultValue={10}
        label='Accept payments via'
        aria-label='Accept payments via'
      >
        <MenuItem value={10}>Túuuu</MenuItem>
        <MenuItem value={20}>Nguuuu</MenuItem>
        <MenuItem value={30}>Vlllll</MenuItem>
      </Select>
    </FormControl>
  )
}

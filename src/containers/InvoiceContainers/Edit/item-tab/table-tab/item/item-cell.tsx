import { FormControl, Select, MenuItem, Box, TextField } from '@mui/material'

export const ItemCell = () => {
  return (
    <>
      <FormControl variant='outlined' sx={{ minWidth: 120, width: '100%' }}>
        <Select
          fullWidth
          labelId='demo-simple-select-outlined-label'
          id='demo-simple-select-outlined'
          defaultValue={10}
          size='small'
        >
          <MenuItem value={10}>Túuuu</MenuItem>
          <MenuItem value={20}>Nguuuu</MenuItem>
          <MenuItem value={30}>Vlllll</MenuItem>
        </Select>
      </FormControl>
      <Box mt={4}>
        <TextField id='outlined-multiline-static' multiline rows={2} variant='outlined' fullWidth />
      </Box>
    </>
  )
}

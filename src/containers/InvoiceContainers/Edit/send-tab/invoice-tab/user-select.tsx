import { Box, FormControl, Select, MenuItem } from '@mui/material'

export const UserSelect = () => {
  return (
    <Box mt={2}>
      <FormControl variant='outlined' sx={{ minWidth: 120 }}>
        <Select
          labelId='demo-simple-select-standard-label'
          id='demo-simple-select-standard'
          defaultValue={10}
          size='small'
        >
          <MenuItem value={10}>Túuuu</MenuItem>
          <MenuItem value={20}>Nguuuu</MenuItem>
          <MenuItem value={30}>Vlllll</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

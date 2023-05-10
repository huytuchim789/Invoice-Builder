import { Box, Button, InputAdornment } from '@mui/material'

import AddIcon from '@mui/icons-material/Add'

export const AddItemButton = () => {
  return (
    <Box mt={4}>
      <Button
        variant='contained'
        size='small'
        startIcon={
          <InputAdornment position='start'>
            <AddIcon style={{ color: '#FFF' }} />
          </InputAdornment>
        }
      >
        Add Item
      </Button>
    </Box>
  )
}

import { Box, Button, InputAdornment } from '@mui/material'

import AddIcon from '@mui/icons-material/Add'
import { useEditItemInvoice } from './table-tab/component'

export const AddItemButton = () => {
  const { handleAddOneMoreItem } = useEditItemInvoice()

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
        onClick={handleAddOneMoreItem}
      >
        Add Item
      </Button>
    </Box>
  )
}

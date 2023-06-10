import { Box, Button, InputAdornment } from '@mui/material'

import AddIcon from '@mui/icons-material/Add'
import { useInvoiceAddStore } from '../../store'

export const AddItemButton = () => {
  const { addItemContent } = useInvoiceAddStore((state: any) => state.itemContentTabStore)

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
        onClick={addItemContent}
      >
        Add Item
      </Button>
    </Box>
  )
}

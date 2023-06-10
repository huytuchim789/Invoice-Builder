import { Box } from '@mui/material'

import { TableItem } from './table-tab'
import { AddItemButton } from './button-tab/add-item-btn'

export const ItemTab = () => {
  return (
    <Box padding={3} borderTop={1} borderColor={'#808080'}>
      <TableItem />
      <AddItemButton />
    </Box>
  )
}

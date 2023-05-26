import { Box } from '@mui/material'

import { FilterTab } from './filter-tab'
import { TableTab } from './table-tab'

export const InvoiceList = () => {
  return (
    <Box>
      <FilterTab />
      <Box mt={4}>
        <TableTab />
      </Box>
    </Box>
  )
}

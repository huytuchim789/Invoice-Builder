import { Box } from '@mui/material'

import FilterTab from './filter-tab'
import CustomerListTableContent from './table-tab'

const CustomerList = () => {
  return (
    <Box>
      <FilterTab />
      <Box>
        <CustomerListTableContent />
      </Box>
    </Box>
  )
}

export default CustomerList

import { Box } from '@mui/material'

import FilterSelectContent from './FilterSelect/FilterSelectContent'
import ListInvoiceContent from './ListInvoice/ListInvoiceContent'

export const InvoiceList = () => {
  return (
    <Box>
      <FilterSelectContent />
      <Box mt={4}>
        <ListInvoiceContent />
      </Box>
    </Box>
  )
}

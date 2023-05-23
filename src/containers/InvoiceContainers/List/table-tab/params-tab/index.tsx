import { Stack } from '@mui/material'

import { SearchInvoice } from './search'
import { CreateInvoice } from './buttons'

export const ParamsTab = () => {
  return (
    <Stack direction='row'>
      <SearchInvoice />
      <CreateInvoice />
    </Stack>
  )
}

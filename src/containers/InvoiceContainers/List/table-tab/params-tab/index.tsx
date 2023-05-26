import { Stack } from '@mui/material'

import { SearchInvoice } from './search'
import { CreateInvoice } from './buttons/create-invoice'

export const ParamsTab = () => {
  return (
    <Stack direction='row' alignItems='center' gap={3} justifyContent='flex-end'>
      <SearchInvoice />
      <CreateInvoice />
    </Stack>
  )
}

import { Typography } from '@mui/material'

import { UserSelect } from './user-select'
import { AddressTab } from './address-tab'

export const InvoiceTab = () => {
  return (
    <>
      <Typography>Invoice To:</Typography>
      <UserSelect />
      <AddressTab />
    </>
  )
}

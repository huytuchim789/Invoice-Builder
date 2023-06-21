import React from 'react'

import { Typography } from '@mui/material'
import { AddressTab } from './address-tab'


export const InvoiceTab = () => {
  return (
    <React.Fragment>
      <Typography>Invoice To:</Typography>
      <AddressTab />
    </React.Fragment>
  )
}

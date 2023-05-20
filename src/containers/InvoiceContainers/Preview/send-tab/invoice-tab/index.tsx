import React from 'react'

import { Typography } from '@mui/material'

import { UserSelect } from './user-select'
import { AddressTab } from './address-tab'
import { DrawerNewCustomer } from './drawer-tab'
import { useInvoiceAddStore } from '../../store'

export const InvoiceTab = () => {
  const { user } = useInvoiceAddStore((state: any) => state.userSelectTabStore)

  return (
    <React.Fragment>
      <Typography>Invoice To:</Typography>
      <UserSelect />
      {user.name !== '' && <AddressTab />}
      <DrawerNewCustomer />
    </React.Fragment>
  )
}

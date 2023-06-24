import React from 'react'
import Planning from './Planning'
import Payment from './Payment'
import { Divider } from '@mui/material'

export default function TabBilling() {
  return (
    <>
      <Planning />
      <Divider />
      <Payment />
    </>
  )
}

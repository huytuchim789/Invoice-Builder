import React from 'react'

import { SubTotal } from './sub-total'
import { Tax } from './tax'
import { Total } from './total'

export const Accumulate = () => {
  return (
    <React.Fragment>
      <SubTotal />
      <Tax />
      <Total />
    </React.Fragment>
  )
}

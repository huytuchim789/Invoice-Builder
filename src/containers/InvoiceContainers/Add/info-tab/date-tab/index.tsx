import React from 'react'

import { EndDate } from './end-date'
import { InvoiceId } from './invoice-id'
import { StartDate } from './start-date'

export const DateTab = () => {
  return (
    <React.Fragment>
      <InvoiceId />
      <StartDate />
      <EndDate />
    </React.Fragment>
  )
}

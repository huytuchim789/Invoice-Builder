import React from 'react'

import { EndDate } from './end-date'
import { StartDate } from './start-date'

export const DateTab = () => {
  return (
    <React.Fragment>
      <StartDate />
      <EndDate />
    </React.Fragment>
  )
}

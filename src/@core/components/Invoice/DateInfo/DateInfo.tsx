import React from 'react'

import GridComponent from './GridComponent'
import DatePickerComponent from './DatePickerComponent'

const DateInfo = () => {
  return (
    <React.Fragment>
      <GridComponent content='Date Issued' component={<DatePickerComponent status='start' />} />
      <GridComponent content='Date Due' component={<DatePickerComponent status='end' />} />
    </React.Fragment>
  )
}

export default DateInfo

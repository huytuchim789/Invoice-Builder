import React from 'react'

import GridComponent from '../atoms/GridComponent'
import DatePickerComponent from '../atoms/DatePickerComponent'

const DateTab = () => {
  return (
    <React.Fragment>
      <GridComponent content='Date Issued' component={<DatePickerComponent status='start' />} />
      <GridComponent content='Date Due' component={<DatePickerComponent status='end' />} />
    </React.Fragment>
  )
}

export default DateTab

import React from 'react'

import DatePickerComponent from './DatePickerComponent'
import GridComponent from '../atoms/GridComponent'

const DateInfo = () => {
  return (
    <React.Fragment>
      <GridComponent content='Date Issued' component={<DatePickerComponent status='start' />} />
      <GridComponent content='Date Due' component={<DatePickerComponent status='end' />} />
    </React.Fragment>
  )
}

export default DateInfo

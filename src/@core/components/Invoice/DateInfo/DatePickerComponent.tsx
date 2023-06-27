import { forwardRef } from 'react'
import DatePicker from 'react-datepicker'

import { TextField } from '@mui/material'
import extendedDayJs from 'src/@core/utils/dayjs'
import { useDateInfoStore } from './store'

interface Props {
  status: 'start' | 'end'
}

const CustomInput = forwardRef((props, ref) => {
  return <TextField size='small' variant='outlined' fullWidth {...props} inputRef={ref} autoComplete='off' />
})

const DatePickerComponent = ({ status }: Props) => {
  const { date, setDate } = useDateInfoStore()

  return (
    <DatePicker
      selected={extendedDayJs(date[status]).toDate()}
      minDate={status === 'end' ? extendedDayJs(date.start).toDate() : null}
      maxDate={extendedDayJs().toDate()}
      showYearDropdown
      showMonthDropdown
      placeholderText='MM-DD-YYYY'
      customInput={<CustomInput />}
      onChange={(date: Date) => setDate(status, extendedDayJs(date).startOf('day').format('YYYY-MM-DD'))}
    />
  )
}

export default DatePickerComponent

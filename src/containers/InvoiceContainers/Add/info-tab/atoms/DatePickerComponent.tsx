import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { forwardRef } from 'react'
import DatePicker from 'react-datepicker'

import { TextField } from '@mui/material'
import { useInvoiceAddStore } from '../../store'

dayjs.extend(utc)

interface Props {
  status: 'start' | 'end'
}

const CustomInput = forwardRef((props, ref) => {
  return <TextField size='small' variant='outlined' fullWidth {...props} inputRef={ref} autoComplete='off' />
})

const DatePickerComponent = ({ status }: Props) => {
  const { date, setDate } = useInvoiceAddStore((state: any) => state.dateSelectStore)

  return (
    <DatePicker
      selected={dayjs(date[status]).toDate()}
      minDate={status === 'end' ? dayjs(date.start).toDate() : null}
      maxDate={dayjs().toDate()}
      showYearDropdown
      showMonthDropdown
      placeholderText='MM-DD-YYYY'
      customInput={<CustomInput />}
      onChange={(date: Date) => setDate(status, dayjs(date).utc().local().startOf('day').format('YYYY-MM-DD'))}
    />
  )
}

export default DatePickerComponent

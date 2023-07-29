import { Fragment, forwardRef } from 'react'
import DatePicker from 'react-datepicker'

import { TextField, Typography } from '@mui/material'
import extendedDayJs from 'src/@core/utils/dayjs'
import { useDateInfoStore } from './store'
import { useFormContext } from 'react-hook-form'

interface Props {
  status: 'start' | 'end'
}

const CustomInput = forwardRef((props, ref) => {
  return <TextField size='small' variant='outlined' fullWidth {...props} inputRef={ref} autoComplete='off' />
})

const DatePickerComponent = ({ status }: Props) => {
  const { date, setDate } = useDateInfoStore()
  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <Fragment>
      <DatePicker
        selected={extendedDayJs(date[status]).toDate()}
        minDate={status === 'end' ? extendedDayJs(date.start).toDate() : null}
        maxDate={extendedDayJs().toDate()}
        {...register(status === 'start' ? 'startDate' : 'endDate', { required: true })}
        showYearDropdown
        showMonthDropdown
        placeholderText='MM-DD-YYYY'
        customInput={<CustomInput />}
        onChange={(date: Date) => setDate(status, extendedDayJs(date).startOf('day').format('YYYY-MM-DD'))}
      />
      {errors[status === 'start' ? 'startDate' : 'endDate'] && (
        <Typography color='red'>This field is required</Typography>
      )}
    </Fragment>
  )
}

export default DatePickerComponent

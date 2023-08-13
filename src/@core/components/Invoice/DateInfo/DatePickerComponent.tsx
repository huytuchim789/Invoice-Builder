import { Fragment, forwardRef } from 'react'
import DatePicker from 'react-datepicker'

import { TextField, Typography } from '@mui/material'
import extendedDayJs from 'src/@core/utils/dayjs'
import { useDateInfoStore } from './store'
import { Controller, useFormContext } from 'react-hook-form'

interface Props {
  status: 'start' | 'end'
}

const CustomInput = forwardRef((props, ref) => {
  return <TextField size='small' variant='outlined' fullWidth {...props} inputRef={ref} autoComplete='off' />
})

const DatePickerComponent = ({ status }: Props) => {
  const {
    formState: { errors },
    control,
    watch
  } = useFormContext()

  const startDate = watch('startDate')
  const endDate = watch('endDate')

  return (
    <Fragment>
      <Controller
        name={status === 'start' ? 'startDate' : 'endDate'}
        control={control}
        render={({ field }) => {
          const { onChange, ref, value } = field

          return (
            <DatePicker
              ref={ref}
              selected={status === 'start' ? extendedDayJs(startDate).toDate() : extendedDayJs(endDate).toDate()}
              minDate={status === 'end' ? extendedDayJs(startDate).toDate() : null}
              maxDate={extendedDayJs().toDate()}
              value={value}
              showYearDropdown
              showMonthDropdown
              placeholderText='MM-DD-YYYY'
              customInput={<CustomInput />}
              onChange={onChange}
            />
          )
        }}
      />
      {errors[status === 'start' ? 'startDate' : 'endDate'] && (
        <Typography color='red'>This field is required</Typography>
      )}
    </Fragment>
  )
}

export default DatePickerComponent

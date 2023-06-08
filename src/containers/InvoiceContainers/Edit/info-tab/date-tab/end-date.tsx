import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { forwardRef } from 'react'
import DatePicker from 'react-datepicker'

import { Grid, Typography, TextField } from '@mui/material'
import { useInvoiceEditStore } from '../../store'

dayjs.extend(utc)

const CustomInput = forwardRef((props, ref) => {
  return <TextField size='small' variant='outlined' fullWidth {...props} inputRef={ref} autoComplete='off' />
})

export const EndDate = () => {
  const { date, setDate } = useInvoiceEditStore((state: any) => state.dateSelectStore)

  return (
    <Grid container alignItems='center' marginTop={3} justifyContent='space-between'>
      <Grid item lg={4} md={4} sm={4}>
        <Typography>Date Due:</Typography>
      </Grid>

      <Grid item lg={8} md={8} sm={8}>
        <DatePicker
          selected={dayjs(date.end).toDate()}
          minDate={dayjs(date.start).toDate()}
          showYearDropdown
          showMonthDropdown
          placeholderText='MM-DD-YYYY'
          customInput={<CustomInput />}
          id='form-layouts-separator-date'
          onChange={(date: Date) => setDate('end', dayjs(date).utc().local().startOf('day').format('YYYY-MM-DD'))}
        />
      </Grid>
    </Grid>
  )
}

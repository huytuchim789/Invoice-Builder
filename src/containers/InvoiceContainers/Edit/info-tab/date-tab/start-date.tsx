import { useState, forwardRef } from 'react'

import DatePicker from 'react-datepicker'

import { Grid, Typography, TextField } from '@mui/material'

const CustomInput = forwardRef((props, ref) => {
  return <TextField size='small' variant='outlined' fullWidth {...props} inputRef={ref} autoComplete='off' />
})

export const StartDate = () => {
  const [startDate, setStartDate] = useState<Date | null | undefined>(null)

  return (
    <Grid container alignItems='center' marginTop={3}>
      <Grid item lg={4} md={12}>
        <Typography>Date Issued:</Typography>
      </Grid>

      <Grid item lg={8} md={12}>
        <DatePicker
          selected={startDate}
          showYearDropdown
          showMonthDropdown
          placeholderText='MM-DD-YYYY'
          customInput={<CustomInput />}
          id='form-layouts-separator-date'
          onChange={(date: Date) => setStartDate(date)}
        />
      </Grid>
    </Grid>
  )
}

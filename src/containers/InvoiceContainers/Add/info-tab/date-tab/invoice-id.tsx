import { Grid, Typography, Input, InputAdornment } from '@mui/material'

import Grid3x3Icon from '@mui/icons-material/Grid3x3'

export const InvoiceId = () => {
  return (
    <Grid container alignItems='center'>
      <Grid item lg={4} md={12}>
        <Typography>Invoice</Typography>
      </Grid>
      <Grid item lg={8} md={12}>
        <Input
          type='text'
          placeholder='23542'
          startAdornment={
            <InputAdornment position='start'>
              <Grid3x3Icon />
            </InputAdornment>
          }
        />
      </Grid>
    </Grid>
  )
}

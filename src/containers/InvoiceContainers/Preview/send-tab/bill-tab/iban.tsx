import { Grid, Typography } from '@mui/material'

export const Iban = () => {
  return (
    <Grid container alignItems='center' justifyContent='space-between'>
      <Grid item lg={4} md={12} sm={12}>
        <Typography fontSize={14} color={'#808080'}>
          IBAN:
        </Typography>
      </Grid>
      <Grid item lg={8} md={12} sm={12}>
        <Typography fontSize={14} color={'#808080'}>
          ETD95476213874685
        </Typography>
      </Grid>
    </Grid>
  )
}

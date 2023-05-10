import { Grid, Typography } from '@mui/material'

export const Discount = () => {
  return (
    <Grid container alignItems='center' lg={12}>
      <Grid item lg={4} md={12}>
        <Typography fontSize={14} color={'#808080'}>
          Discount:
        </Typography>
      </Grid>
      <Grid item lg={8} md={12}>
        <Typography fontSize={14} color={'#808080'}>
          $28
        </Typography>
      </Grid>
    </Grid>
  )
}

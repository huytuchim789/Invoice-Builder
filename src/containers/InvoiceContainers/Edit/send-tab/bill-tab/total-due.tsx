import { Grid, Typography } from '@mui/material'

export const TotalDue = () => {
  return (
    <Grid container alignItems='center' lg={12}>
      <Grid item lg={4} md={12}>
        <Typography fontSize={14} color={'#808080'}>
          Total Due:
        </Typography>
      </Grid>
      <Grid item lg={8} md={12}>
        <Typography fontSize={14} color={'#808080'}>
          $ 12,110.55
        </Typography>
      </Grid>
    </Grid>
  )
}
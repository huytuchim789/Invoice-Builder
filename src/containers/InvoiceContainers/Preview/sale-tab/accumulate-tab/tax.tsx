import { Grid, Typography } from '@mui/material'

export const Tax = () => {
  return (
    <Grid container alignItems='center' lg={12} justifyContent='space-between'>
      <Grid item lg={4} md={12}>
        <Typography fontSize={14} color={'#808080'}>
          Tax:
        </Typography>
      </Grid>
      <Grid item lg={8} md={12}>
        <Typography fontSize={14} color={'#808080'}>
          21%
        </Typography>
      </Grid>
    </Grid>
  )
}

import { Grid, Typography } from '@mui/material'

export const Total = () => {
  return (
    <Grid container alignItems='center' lg={12} style={{ borderTop: 1, borderColor: '#808080' }}>
      <Grid item lg={4} md={12}>
        <Typography fontSize={14} color={'#808080'}>
          Total:
        </Typography>
      </Grid>
      <Grid item lg={8} md={12}>
        <Typography fontSize={14} color={'#808080'}>
          $1690
        </Typography>
      </Grid>
    </Grid>
  )
}

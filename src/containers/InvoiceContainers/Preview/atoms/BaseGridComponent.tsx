import { Grid, Typography } from '@mui/material'

interface IBaseGridComponent {
  title: string
  description: string
}

const BaseGridComponent = ({ title, description }: IBaseGridComponent) => {
  return (
    <Grid container alignItems='center' marginTop={3} justifyContent='space-between'>
      <Grid item lg={4} md={4} sm={4}>
        <Typography>{title}:</Typography>
      </Grid>

      <Grid item lg={8} md={8} sm={8}>
        <Typography fontSize={12}>{description}</Typography>
      </Grid>
    </Grid>
  )
}

export default BaseGridComponent

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import React from 'react'

import { Grid, Typography } from '@mui/material'

dayjs.extend(utc)

interface Props {
  content: string
  component: React.ReactElement
}

const GridComponent = ({ content, component }: Props) => {
  return (
    <Grid container alignItems='center' marginTop={3} justifyContent='space-between'>
      <Grid item lg={4} md={4} sm={4}>
        <Typography>{content}</Typography>
      </Grid>

      <Grid item lg={8} md={8} sm={8}>
        {component}
      </Grid>
    </Grid>
  )
}

export default GridComponent

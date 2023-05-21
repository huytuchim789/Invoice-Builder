import React from 'react'
import { Grid, Typography } from '@mui/material'

interface Props {
  title: string
  content: string
  style?: React.CSSProperties
}

export const GridBill = ({ title, content, ...props }: Props) => {
  return (
    <Grid container alignItems='center' justifyContent='space-between' {...props}>
      <Grid item lg={4} md={4} sm={4}>
        <Typography fontSize={14} color={'#808080'}>
          {title}:
        </Typography>
      </Grid>
      <Grid item lg={8} md={8} sm={8}>
        <Typography fontSize={14} color={'#808080'} textAlign='right'>
          {content}
        </Typography>
      </Grid>
    </Grid>
  )
}

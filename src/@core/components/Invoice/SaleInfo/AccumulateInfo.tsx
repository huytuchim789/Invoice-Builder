import React from 'react'
import { Grid, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'

interface Props {
  title: string
  content: string
  style?: React.CSSProperties
}

const GridAccumulate = ({ title, content, ...props }: Props) => {
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

const AccumulateInfo = () => {
  const { watch } = useFormContext()
  const items = watch('items')
  const subTotal = items
    ? items.reduce((acc: any, item: any) => {
        const valueStr = item.value ? item.value : '{}'
        const cost = JSON.parse(valueStr)

        return acc + Number(item.hours) * Number(cost.price ? cost.price : 0) * Number(item.cost)
      }, 0)
    : 0

  return (
    <React.Fragment>
      <GridAccumulate title='Subtotal' content={`${subTotal}`} />
      <GridAccumulate title='Tax' content='8%' />
      <GridAccumulate
        title='Total'
        content={`${subTotal + (subTotal * 8) / 100}`}
        style={{ borderTop: 1, borderColor: '#808080' }}
      />
    </React.Fragment>
  )
}

export default AccumulateInfo

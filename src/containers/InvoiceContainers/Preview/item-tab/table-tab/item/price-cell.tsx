import { useContext } from 'react'

import { Typography } from '@mui/material'

import { ItemContext } from '../table-body'
import { IItemContent } from '../../store'

export const PriceCell = () => {
  const { data } = useContext(ItemContext) as { data: IItemContent; count: number }

  return <Typography>$ {data.price}</Typography>
}

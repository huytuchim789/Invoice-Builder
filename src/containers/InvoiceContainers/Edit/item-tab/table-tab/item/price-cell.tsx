import { useContext } from 'react'

import { Typography } from '@mui/material'

import { IItemContent } from '../../store'
import { ItemEditContext } from '../table-body'

export const PriceCell = () => {
  const { data } = useContext(ItemEditContext) as { data: IItemContent; count: number }

  return <Typography>$ {data.price}</Typography>
}

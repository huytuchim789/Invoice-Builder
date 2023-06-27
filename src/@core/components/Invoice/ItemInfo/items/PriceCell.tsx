import { useContext } from 'react'

import { Typography } from '@mui/material'

import { ItemChildContext } from '../TableBodyItem'
import { IItemContent } from '../store'

export const PriceCell = () => {
  const { item } = useContext(ItemChildContext) as { item: IItemContent; index: number }

  return <Typography>$ {item.price}</Typography>
}

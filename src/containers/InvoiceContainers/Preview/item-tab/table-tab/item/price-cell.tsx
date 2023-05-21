import { useContext } from 'react'

import { Typography } from '@mui/material'

import { ItemContext } from '../table-body'
import { IItemsData } from 'src/@core/models/api/invoice/invoice.interface'

export const PriceCell = () => {
  const { data } = useContext(ItemContext) as { data: IItemsData; count: number }

  return <Typography>$ {data.price}</Typography>
}

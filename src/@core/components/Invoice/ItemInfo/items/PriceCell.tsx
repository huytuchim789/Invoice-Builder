import { useContext } from 'react'

import { Typography } from '@mui/material'

import { ItemChildContext } from '../TableBodyItem'
import { IItemContent } from '../store'
import { useFormContext } from 'react-hook-form'

export const PriceCell = () => {
  const { watch } = useFormContext()
  const { index } = useContext(ItemChildContext) as { item: IItemContent; index: number }

  const [hours, cost] = watch([`items[${index}].hours`, `items[${index}].cost`]) || '0'

  return <Typography>$ {hours * cost}</Typography>
}

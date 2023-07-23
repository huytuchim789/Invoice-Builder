import { useContext, useMemo } from 'react'

import { Typography } from '@mui/material'

import { ItemChildContext } from '../TableBodyItem'
import { IItemContent } from '../store'
import { useFormContext } from 'react-hook-form'

export const PriceCell = () => {
  const { watch } = useFormContext()
  const { index } = useContext(ItemChildContext) as { item: IItemContent; index: number }

  const [priceString, hours, cost] =
    watch([`items[${index}].value`, `items[${index}].hours`, `items[${index}].cost`]) || '0'

  const costConvert = useMemo(() => {
    if (!priceString) return { price: 0 }
    return JSON.parse(priceString)
  }, [priceString])

  return <Typography>$ {hours * (costConvert.price ? costConvert.price : 0) * Number(cost)}</Typography>
}

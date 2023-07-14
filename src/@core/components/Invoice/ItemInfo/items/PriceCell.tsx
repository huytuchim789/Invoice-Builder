import { useContext, useMemo } from 'react'

import { Typography } from '@mui/material'

import { ItemChildContext } from '../TableBodyItem'
import { IItemContent } from '../store'
import { useFormContext } from 'react-hook-form'

export const PriceCell = () => {
  const { watch } = useFormContext()
  const { index } = useContext(ItemChildContext) as { item: IItemContent; index: number }

  const [priceString, hours] = watch([`items[${index}].value`, `items[${index}].hours`]) || '0'

  const cost = useMemo(() => {
    if (!priceString) return { price: 0 }
    return JSON.parse(priceString)
  }, [priceString])

  return <Typography>$ {hours * (cost.price ? cost.price : 0)}</Typography>
}

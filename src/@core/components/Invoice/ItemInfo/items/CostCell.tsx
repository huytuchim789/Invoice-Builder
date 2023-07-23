import { useContext, useMemo } from 'react'
import { TextField } from '@mui/material'

import { ItemChildContext } from '../TableBodyItem'
import { IItemContent } from '../store'
import { useFormContext } from 'react-hook-form'

export const CostCell = () => {
  const { watch } = useFormContext()
  const { index } = useContext(ItemChildContext) as { item: IItemContent; index: number }

  const priceString = watch(`items[${index}].value`)

  const cost = useMemo(() => {
    if (!priceString) return { price: 0 }

    return JSON.parse(priceString)
  }, [priceString])

  return (
    <>
      <TextField
        sx={{ width: '150px' }}
        type='number'
        size='small'
        value={cost.price ? cost.price : 0}
        variant='outlined'
      />
    </>
  )
}

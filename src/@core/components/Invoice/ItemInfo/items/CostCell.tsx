import { useContext } from 'react'
import { TextField } from '@mui/material'

import { ItemChildContext } from '../TableBodyItem'
import { IItemContent } from '../store'
import { useItemInfoController } from '../controller'
import { useFormContext } from 'react-hook-form'

export const CostCell = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext()
  const { item, index } = useContext(ItemChildContext) as { item: IItemContent; index: number }

  return (
    <>
      <TextField
        sx={{ width: '150px' }}
        defaultValue={item.cost}
        type='number'
        size='small'
        variant='outlined'
        error={Boolean(errors?.items?.[index]?.cost)}
        {...register(`items[${index}].cost`, { required: true })}
      />
    </>
  )
}

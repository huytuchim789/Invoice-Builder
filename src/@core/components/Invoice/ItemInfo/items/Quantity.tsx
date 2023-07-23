import { useContext } from 'react'
import { TextField, Typography } from '@mui/material'

import { IItemContent } from '../store'
import { ItemChildContext } from '../TableBodyItem'
import { useFormContext } from 'react-hook-form'

export const QuantityCell = () => {
  const { item, index } = useContext(ItemChildContext) as { item: IItemContent; index: number }

  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <>
      <TextField
        type='number'
        {...register(`items[${index}].cost`, { required: true })}
        defaultValue={item.hours}
        error={Boolean(errors?.items?.[index]?.cost)}
        sx={{ width: '150px' }}
        size='small'
        variant='outlined'
      />
      {errors?.items?.[index]?.cost && <Typography color='red'>This field is required</Typography>}
    </>
  )
}

//@ts-nocheck

import { useContext } from 'react'
import { TextField, Typography } from '@mui/material'

import { IItemContent } from '../store'
import { ItemChildContext } from '../TableBodyItem'
import { useFormContext } from 'react-hook-form'

export const HourCell = () => {
  const { item, index } = useContext(ItemChildContext) as { item: IItemContent; index: number }

  const {
    register,
    formState: { errors }
  } = useFormContext<any>()

  return (
    <>
      <TextField
        type='number'
        {...register(`items[${index}].hours`, { required: true })}
        defaultValue={item.hours}
        error={Boolean(errors?.items?.[index]?.hours)}
        sx={{ width: '150px' }}
        size='small'
        variant='outlined'
      />
      {errors?.items?.[index]?.hours && <Typography color='red'>This field is required</Typography>}
    </>
  )
}

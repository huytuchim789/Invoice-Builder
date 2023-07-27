//@ts-nocheck

import { memo, useContext } from 'react'

import { FormControl, Select, MenuItem, Box, TextField, Typography } from '@mui/material'

import { IItemContent, useItemContentStore } from '../store'
import { ItemChildContext } from '../TableBodyItem'
import { FieldError, FieldErrorsImpl, Merge, useFormContext } from 'react-hook-form'
import { IItemsData } from 'src/@core/models/api/invoice/invoice.interface'

export const ItemCell = memo(() => {
  const { index } = useContext(ItemChildContext) as {
    item: IItemContent
    index: number & (FieldError | Merge<FieldError, FieldErrorsImpl<any>>)
  }

  const { itemsInvoiceSelectList } = useItemContentStore()

  const {
    register,
    watch,
    formState: { errors }
  } = useFormContext()

  const itemsData = watch(`items[${index}].value`)

  return (
    <>
      <FormControl variant='outlined' sx={{ minWidth: 120, width: '100%' }}>
        <Select
          fullWidth
          labelId='demo-simple-select-outlined-label'
          id='demo-simple-select-outlined'
          value={itemsData}
          {...register(`items[${index}].value`, { required: true })}
          size='small'
        >
          {itemsInvoiceSelectList.map((item: IItemsData, index: number) => (
            <MenuItem value={JSON.stringify(item)} key={`${item.name}-${index}`}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {errors.items && errors.items[index] && errors.items[index].name && (
        <Typography color={'red'}>This field is required</Typography>
      )}
      <Box mt={4}>
        <TextField
          id='outlined-multiline-static'
          {...register(`items.${index}.description`, { required: true })}
          multiline
          rows={2}
          variant='outlined'
          fullWidth
        />
        {errors.items && errors.items[index] && errors.items[index].description && (
          <Typography color={'red'}>This field is required</Typography>
        )}
      </Box>
    </>
  )
})

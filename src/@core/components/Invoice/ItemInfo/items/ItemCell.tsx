import { useContext } from 'react'

import { FormControl, Select, MenuItem, Box, TextField, Typography } from '@mui/material'

import { IItemContent } from '../store'
import { useItemInfoController } from '../controller'
import { ItemChildContext } from '../TableBodyItem'
import { FieldError, FieldErrorsImpl, Merge, useFormContext } from 'react-hook-form'

interface IItemSelect {
  name: string
  value: string
}

const ItemSelects: IItemSelect[] = [
  {
    name: 'App Design',
    value: 'App Design'
  },
  {
    name: 'App Customization',
    value: 'App Customization'
  },
  {
    name: 'ABC Template',
    value: 'ABC Template'
  },
  {
    name: 'App Development',
    value: 'App Development'
  }
]

export const ItemCell = () => {
  const { index } = useContext(ItemChildContext) as {
    item: IItemContent
    index: number & (FieldError | Merge<FieldError, FieldErrorsImpl<any>>)
  }

  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <>
      <FormControl variant='outlined' sx={{ minWidth: 120, width: '100%' }}>
        <Select
          fullWidth
          labelId='demo-simple-select-outlined-label'
          id='demo-simple-select-outlined'
          defaultValue=''
          {...register(`items[${index}].name`, { required: true })}
          size='small'
        >
          {ItemSelects.map((item: IItemSelect, index: number) => (
            <MenuItem value={item.value} key={`${item.name}-${index}`}>
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
}

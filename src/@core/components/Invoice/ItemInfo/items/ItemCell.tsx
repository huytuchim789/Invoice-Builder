import { useContext } from 'react'

import { FormControl, Select, MenuItem, Box, TextField } from '@mui/material'

import { IItemContent } from '../store'
import { useItemInfoController } from '../controller'
import { ItemChildContext } from '../TableBodyItem'

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
  const { item, index } = useContext(ItemChildContext) as { item: IItemContent; index: number }
  const { handleChangeInputItem, handleChangeSelectItem } = useItemInfoController()

  return (
    <>
      <FormControl variant='outlined' sx={{ minWidth: 120, width: '100%' }}>
        <Select
          fullWidth
          labelId='demo-simple-select-outlined-label'
          id='demo-simple-select-outlined'
          defaultValue={item.name}
          onChange={handleChangeSelectItem('name', index)}
          size='small'
        >
          {ItemSelects.map((item: IItemSelect, index: number) => (
            <MenuItem value={item.value} key={`${item.name}-${index}`}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box mt={4}>
        <TextField
          id='outlined-multiline-static'
          onChange={handleChangeInputItem('description', index, 'string')}
          multiline
          rows={2}
          variant='outlined'
          fullWidth
        />
      </Box>
    </>
  )
}

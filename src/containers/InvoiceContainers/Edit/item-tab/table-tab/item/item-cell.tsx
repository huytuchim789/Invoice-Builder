import { FormControl, Select, MenuItem, Box, TextField } from '@mui/material'

import { useEditItemInvoice } from '../component'

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
  const { data, handleEditItem } = useEditItemInvoice()

  return (
    <>
      <FormControl variant='outlined' sx={{ minWidth: 120, width: '100%' }}>
        <Select
          fullWidth
          labelId='demo-simple-select-outlined-label'
          id='demo-simple-select-outlined'
          defaultValue={data.name}
          onChange={handleEditItem('name')}
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
          value={data.description}
          id='outlined-multiline-static'
          onChange={handleEditItem('description')}
          multiline
          rows={2}
          variant='outlined'
          fullWidth
        />
      </Box>
    </>
  )
}

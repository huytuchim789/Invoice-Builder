import { FormControl, Select, MenuItem, Box, TextField, SelectChangeEvent } from '@mui/material'
import { useContext, ChangeEventHandler } from 'react'

import { IItemContent } from '../../store'
import { useInvoiceEditStore } from '../../../store'
import { ItemEditContext } from '../table-body'

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
  const { data, count } = useContext(ItemEditContext) as { data: IItemContent; count: number }

  const { setItemContent } = useInvoiceEditStore((state: any) => state.itemContentTabStore)

  const handleChangeContent = (props: string) => (e: SelectChangeEvent<string>) => {
    setItemContent(e.target.value, props, count)
  }

  const handleChangeDescription =
    (props: string) =>
    (event: { target: { value: string } }): ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> => {
      return setItemContent(event.target.value, props, count)
    }

  return (
    <>
      <FormControl variant='outlined' sx={{ minWidth: 120, width: '100%' }}>
        <Select
          fullWidth
          labelId='demo-simple-select-outlined-label'
          id='demo-simple-select-outlined'
          defaultValue={data.name}
          onChange={handleChangeContent('name')}
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
          onChange={handleChangeDescription('description')}
          multiline
          rows={2}
          variant='outlined'
          fullWidth
        />
      </Box>
    </>
  )
}

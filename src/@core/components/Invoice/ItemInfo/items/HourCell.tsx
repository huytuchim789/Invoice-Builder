import { useContext } from 'react'
import { TextField } from '@mui/material'

import { IItemContent } from '../store'
import { ItemChildContext } from '../TableBodyItem'
import { useItemInfoController } from '../controller'

export const HourCell = () => {
  const { item, index } = useContext(ItemChildContext) as { item: IItemContent; index: number }
  const { handleChangeInputItem } = useItemInfoController()

  return (
    <TextField
      type='number'
      onChange={handleChangeInputItem('hours', index, 'number')}
      defaultValue={item.hours}
      sx={{ width: '150px' }}
      size='small'
      variant='outlined'
    />
  )
}

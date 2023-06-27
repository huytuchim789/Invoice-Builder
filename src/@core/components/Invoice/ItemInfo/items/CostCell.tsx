import { useContext } from 'react'
import { TextField } from '@mui/material'

import { ItemChildContext } from '../TableBodyItem'
import { IItemContent } from '../store'
import { useItemInfoController } from '../controller'

export const CostCell = () => {
  const { item, index } = useContext(ItemChildContext) as { item: IItemContent; index: number }
  const { handleChangeInputItem } = useItemInfoController()

  return (
    <>
      <TextField
        sx={{ width: '150px' }}
        defaultValue={item.cost}
        type='number'
        size='small'
        variant='outlined'
        onChange={handleChangeInputItem('cost', index, 'number')}
      />
    </>
  )
}

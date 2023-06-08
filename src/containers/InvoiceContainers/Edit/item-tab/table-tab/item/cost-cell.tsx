import { useContext, ChangeEventHandler } from 'react'
import { TextField } from '@mui/material'

import { ItemEditContext } from '../table-body'

import { IItemContent } from '../../store'
import { useInvoiceEditStore } from '../../../store'

export const CostCell = () => {
  const { data, count } = useContext(ItemEditContext) as { data: IItemContent; count: number }

  const { setItemContent } = useInvoiceEditStore((state: any) => state.itemContentTabStore)

  const handleChangeDescription =
    (props: string) =>
    (event: { target: { value: string } }): ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> => {
      return setItemContent(Number(event.target.value), props, count)
    }

  return (
    <>
      <TextField
        sx={{ width: '150px' }}
        defaultValue={data.cost}
        type='number'
        size='small'
        variant='outlined'
        value={data.cost}
        onChange={handleChangeDescription('cost')}
      />
    </>
  )
}

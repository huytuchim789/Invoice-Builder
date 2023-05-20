import { useContext, ChangeEventHandler } from 'react'
import { TextField } from '@mui/material'

import { ItemContext } from '../table-body'

import { IItemContent } from '../../store'
import { useInvoiceAddStore } from '../../../store'

export const CostCell = () => {
  const { data, count } = useContext(ItemContext) as { data: IItemContent; count: number }

  const { setItemContent } = useInvoiceAddStore((state: any) => state.itemContentTabStore)

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
        onChange={handleChangeDescription('cost')}
      />
    </>
  )
}

import { useContext, ChangeEventHandler } from 'react'
import { TextField } from '@mui/material'

import { ItemEditContext } from '../table-body'

import { IItemContent } from '../../store'
import { useInvoiceEditStore } from '../../../store'

export const HourCell = () => {
  const { data, count } = useContext(ItemEditContext) as { data: IItemContent; count: number }

  const { setItemContent } = useInvoiceEditStore((state: any) => state.itemContentTabStore)

  const handleChangeHours =
    (props: string) =>
    (event: { target: { value: string } }): ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> => {
      return setItemContent(Number(event.target.value), props, count)
    }

  return (
    <TextField
      type='number'
      onChange={handleChangeHours('hours')}
      value={data.hours}
      sx={{ width: '150px' }}
      size='small'
      variant='outlined'
    />
  )
}

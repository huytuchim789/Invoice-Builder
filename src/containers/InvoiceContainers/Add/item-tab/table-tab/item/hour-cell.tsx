import { useContext, ChangeEventHandler } from 'react'
import { TextField } from '@mui/material'

import { ItemContext } from '../table-body'

import { IItemContent } from '../../store'
import { useInvoiceAddStore } from '../../../store'

export const HourCell = () => {
  const { data, count } = useContext(ItemContext) as { data: IItemContent; count: number }

  const { setItemContent } = useInvoiceAddStore((state: any) => state.itemContentTabStore)

  const handleChangeHours =
    (props: string) =>
    (event: { target: { value: string } }): ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> => {
      return setItemContent(event.target.value, props, count)
    }

  return (
    <TextField
      type='number'
      onChange={handleChangeHours('hour')}
      defaultValue={data.hour}
      sx={{ width: '150px' }}
      size='small'
      variant='outlined'
    />
  )
}

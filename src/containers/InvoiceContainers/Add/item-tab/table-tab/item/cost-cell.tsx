import { useContext, ChangeEventHandler } from 'react'
import { TextField, Box, Typography } from '@mui/material'

import { ItemContext } from '../table-body'

import { IItemContent } from '../../store'
import { useInvoiceAddStore } from '../../../store'

export const CostCell = () => {
  const { data, count } = useContext(ItemContext) as { data: IItemContent; count: number }

  const { setItemContent } = useInvoiceAddStore((state: any) => state.itemContentTabStore)

  const handleChangeDescription =
    (props: string) =>
    (event: { target: { value: string } }): ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> => {
      return setItemContent(event.target.value, props, count)
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
      <Box mt={2}>
        <Typography fontSize={12} color={'#808080'}>
          Discount:
        </Typography>
        <Typography fontSize={12} color={'#808080'}>
          0% 0% 0%
        </Typography>
      </Box>
    </>
  )
}

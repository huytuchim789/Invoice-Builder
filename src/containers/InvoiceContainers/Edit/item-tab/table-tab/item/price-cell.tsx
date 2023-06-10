import { Typography } from '@mui/material'

import { useEditItemInvoice } from '../component'

export const PriceCell = () => {
  const { data } = useEditItemInvoice()

  return <Typography>$ {data.price}</Typography>
}

import { useContext } from 'react'
import { Typography } from '@mui/material'
import { ItemContext } from '..'
import { IInvoiceDetailData } from 'src/@core/models/api/invoice/invoice.interface'

export const TotalCell = () => {
  const { data } = useContext(ItemContext) as { data: IInvoiceDetailData }

  return <Typography>{data.total}</Typography>
}

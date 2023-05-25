import { useContext } from 'react'
import { Typography } from '@mui/material'
import { IInvoiceDetailData } from 'src/@core/models/api/invoice/invoice.interface'
import { ItemContext } from '..'

export const ClientCell = () => {
  const { data } = useContext(ItemContext) as { data: IInvoiceDetailData }

  return <Typography>{data.customer.name}</Typography>
}

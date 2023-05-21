import { useContext } from 'react'
import { Typography } from '@mui/material'

import { ItemContext } from '../table-body'

export const HourCell = () => {
  const { data } = useContext(ItemContext) as { data: any }

  return <Typography>{data.hours}</Typography>
}

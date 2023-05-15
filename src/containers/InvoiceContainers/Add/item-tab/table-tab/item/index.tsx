import { TableRow, TableCell, Typography } from '@mui/material'

import { ItemCell } from './item-cell'
import { CostCell } from './cost-cell'
import { HourCell } from './hour-cell'
import { PriceCell } from './price-cell'

export const ItemContent = () => {
  return (
    <TableRow style={{ alignItems: 'start' }}>
      <TableCell>
        <ItemCell />
      </TableCell>
      <TableCell>
        <CostCell />
      </TableCell>
      <TableCell>
        <HourCell />
      </TableCell>
      <TableCell>
        <PriceCell />
      </TableCell>
      <TableCell>
        <Typography>x</Typography>
      </TableCell>
    </TableRow>
  )
}

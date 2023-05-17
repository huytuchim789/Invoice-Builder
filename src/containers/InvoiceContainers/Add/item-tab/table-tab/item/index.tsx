import { useContext } from 'react'

import { TableRow, TableCell, Box } from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'

import { ItemCell } from './item-cell'
import { CostCell } from './cost-cell'
import { HourCell } from './hour-cell'
import { PriceCell } from './price-cell'
import { ItemContext } from '../table-body'
import { useInvoiceAddStore } from '../../../store'

export const ItemContent = () => {
  const { count } = useContext(ItemContext) as { count: number }
  const { deleteItemContent } = useInvoiceAddStore((state: any) => state.itemContentTabStore)

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
        <Box component='div' onClick={() => deleteItemContent(count)} style={{ cursor: 'pointer' }}>
          <CloseIcon />
        </Box>
      </TableCell>
    </TableRow>
  )
}

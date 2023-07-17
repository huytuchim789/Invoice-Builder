import { Box, TableBody, TableCell, TableRow } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { createContext, memo } from 'react'
import { ItemCell } from './items/ItemCell'
import { CostCell } from './items/CostCell'
import { HourCell } from './items/HourCell'
import { PriceCell } from './items/PriceCell'

export const ItemChildContext = createContext({})

const TableBodyItem = ({ fields, handleRemoveItem }: any) => {
  return (
    <TableBody>
      {fields.map((item: any, index: number) => (
        <ItemChildContext.Provider value={{ item, index, fields: fields }} key={`${item.name}-${index}`}>
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
              <Box
                component='div'
                onClick={() => {
                  handleRemoveItem(index)
                }}
                style={{ cursor: 'pointer' }}
              >
                <CloseIcon />
              </Box>
            </TableCell>
          </TableRow>
        </ItemChildContext.Provider>
      ))}
    </TableBody>
  )
}

export default memo(TableBodyItem)

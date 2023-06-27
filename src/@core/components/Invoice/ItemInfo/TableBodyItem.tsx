import { Box, TableBody, TableCell, TableRow } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useItemInfoController } from './controller'
import { IItemContent } from './store'
import { createContext } from 'react'
import { ItemCell } from './items/ItemCell'
import { CostCell } from './items/CostCell'
import { HourCell } from './items/HourCell'
import { PriceCell } from './items/PriceCell'

export const ItemChildContext = createContext({})

const TableBodyItem = () => {
  const { itemContent, handleDeleteItem } = useItemInfoController()

  return (
    <TableBody>
      {itemContent.map((item: IItemContent, index: number) => (
        <ItemChildContext.Provider value={{ item, index }} key={`${item.name}-${index}`}>
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
              <Box component='div' onClick={() => handleDeleteItem(index)} style={{ cursor: 'pointer' }}>
                <CloseIcon />
              </Box>
            </TableCell>
          </TableRow>
        </ItemChildContext.Provider>
      ))}
    </TableBody>
  )
}

export default TableBodyItem

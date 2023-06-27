import { ReactElement } from 'react'

import { Box, Button, InputAdornment, Table, TableContainer } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import TableHeaderItem from './TableHeaderItem'
import TableBodyItem from './TableBodyItem'
import { useItemInfoController } from './controller'

export interface Column {
  id: string
  label: string
  minWidth?: number
  align?: 'right'
  formatString?: (value: string) => ReactElement
  formatNumber?: (value: number) => ReactElement
}

const ItemInfo = () => {
  const { handleCreateItem } = useItemInfoController()

  return (
    <Box padding={3} borderTop={1} borderColor='#808080'>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label={'Okok'}>
          <TableHeaderItem />
          <TableBodyItem />
        </Table>
      </TableContainer>
      <Box mt={4}>
        <Button
          variant='contained'
          size='small'
          startIcon={
            <InputAdornment position='start'>
              <AddIcon style={{ color: '#FFF' }} />
            </InputAdornment>
          }
          onClick={handleCreateItem}
        >
          Add Item
        </Button>
      </Box>
    </Box>
  )
}

export default ItemInfo

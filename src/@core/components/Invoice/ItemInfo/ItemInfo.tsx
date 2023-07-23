import { ReactElement, useCallback, useEffect } from 'react'
import { useFieldArray } from 'react-hook-form'

import { Box, Button, InputAdornment, Table, TableContainer } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import TableHeaderItem from './TableHeaderItem'
import TableBodyItem from './TableBodyItem'
import useItemsInvoiceListData from 'src/@core/hooks/invoice/useItemInvoiceList'
import { useItemContentStore } from './store'

export interface Column {
  id: string
  label: string
  minWidth?: number
  align?: 'right'
  formatString?: (value: string) => ReactElement
  formatNumber?: (value: number) => ReactElement
}

const ItemInfo = () => {
  const { setItemsInvoiceSelectList } = useItemContentStore()
  const { fields, remove, append } = useFieldArray({
    name: 'items'
  })

  const { data: items } = useItemsInvoiceListData()

  useEffect(() => {
    if (items) {
      setItemsInvoiceSelectList(items)
    }
  }, [items])

  const handleRemoveItem = useCallback((index: number) => {
    remove(index)
  }, [])

  const handleAddItem = () => {
    append({
      hours: '',
      cost: '',
      description: '',
      value: '{}'
    })
  }

  return (
    <Box padding={3} borderTop={1} borderColor='#808080'>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label={'Okok'}>
          <TableHeaderItem />
          <TableBodyItem fields={fields} handleRemoveItem={handleRemoveItem} />
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
          onClick={() => {
            handleAddItem()
          }}
        >
          Add Item
        </Button>
      </Box>
    </Box>
  )
}

export default ItemInfo

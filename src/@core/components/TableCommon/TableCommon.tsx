import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { ITableCommonHeader } from 'src/@core/models/common'
import { ChangeEvent, createContext } from 'react'
import TableCommonBody from './TableCommonBody'
import TableCommonHeader from './TableCommonHeader'
import LoadingData from './LoadingData'
import { useRouter } from 'next/router'

export interface ITableCommon {
  checkable?: boolean
  isLoading?: boolean
  headerData: ITableCommonHeader[]
  data: any[]
  pagination?: {
    limit?: number[]
    totalPage?: number
    handleChangeLimit?: (e: SelectChangeEvent<number>) => void
    handleChangePage?: (e: ChangeEvent<unknown>, page: number) => void
  }
}

export const TableCommonContext = createContext({})

const TableCommon = ({ headerData, data, checkable, isLoading, pagination }: ITableCommon) => {
  const router = useRouter()
  console.log('ditttttttttttttttt')

  const { limit = [5, 10, 20, 30], totalPage, handleChangeLimit, handleChangePage } = pagination ?? {}

  return (
    <TableCommonContext.Provider value={{ headerData, data, checkable, isLoading }}>
      <TableContainer component={Paper}>
        <Table>
          <TableCommonHeader />
          {isLoading ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={headerData.length + 1}>
                  <LoadingData />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableCommonBody />
          )}
        </Table>
        {pagination && (
          <Box display='flex' padding={5} justifyContent='space-between'>
            <FormControl>
              <InputLabel id='demo-multiple-name-label'>Show</InputLabel>
              <Select
                labelId='demo-multiple-name-label'
                id='demo-multiple-name'
                defaultValue={Number(router.query.limit || limit[0])}
                style={{ width: 'auto' }}
                onChange={handleChangeLimit}
                input={<OutlinedInput label='Show' />}
              >
                {limit.map((num: number) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Pagination
              page={Number(router.query.page || 1)}
              count={totalPage ?? 0}
              onChange={handleChangePage}
              color='primary'
            />
          </Box>
        )}
      </TableContainer>
    </TableCommonContext.Provider>
  )
}

export default TableCommon

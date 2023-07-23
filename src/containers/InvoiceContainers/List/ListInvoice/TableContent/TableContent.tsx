import React from 'react'

import { Box, CircularProgress, TableCell, TableRow } from '@mui/material'
import TableCommon from 'src/@core/components/TableCommon/TableCommon'
import { columns } from './TableHeader'
import useListInvoiceController from '../controller'
import { useSearchInvoiceStore } from '../store'
import { useInvoiceTotalSum } from 'src/@core/hooks/invoice/useInvoiceData'
import { useTableMutilCheckStore } from 'src/@core/components/TableCommon/store'
import { LoadingComponent } from 'src/@core/components/loading'

const TableContent = () => {
  const { email_transactions, isEmailTransactionsLoading, onChangePagination, handleChangeLimit } =
    useListInvoiceController()
  const { isPaymentMode } = useSearchInvoiceStore()
  const { checkedSelected } = useTableMutilCheckStore()

  const { data, isFetching } = useInvoiceTotalSum(checkedSelected, isPaymentMode)

  return (
    <Box mt={3}>
      <TableCommon
        data={email_transactions?.data ?? []}
        isLoading={isEmailTransactionsLoading}
        headerData={columns}
        pagination={{
          handleChangeLimit: handleChangeLimit,
          totalPage: email_transactions?.last_page,
          handleChangePage: onChangePagination
        }}
        checkable={true}
        extraRows={
          isPaymentMode ? (
            <TableRow>
              {/* <TableCell rowSpan={3} /> */}
              <TableCell colSpan={4}></TableCell>
              {isFetching ? (
                <CircularProgress />
              ) : (
                <TableCell align='left' sx={{ fontSize: '15px', fontWeight: 'bold' }} variant='footer'>
                  {`$ ${data?.toFixed(2) || 0}`}
                </TableCell>
              )}
              <TableCell colSpan={3}></TableCell>
            </TableRow>
          ) : (
            <></>
          )
        }
        selectedKey={isPaymentMode ? 'invoice.code' : 'id'}
      />
    </Box>
  )
}

export default TableContent

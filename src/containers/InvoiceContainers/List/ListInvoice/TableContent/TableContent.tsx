import React from 'react'

import { Box } from '@mui/material'
import TableCommon from 'src/@core/components/TableCommon/TableCommon'
import { columns } from './TableHeader'
import useListInvoiceController from '../controller'

const TableContent = () => {
  const { email_transactions, isEmailTransactionsLoading, onChangePagination, handleChangeLimit } =
    useListInvoiceController()

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
      />
    </Box>
  )
}

export default TableContent

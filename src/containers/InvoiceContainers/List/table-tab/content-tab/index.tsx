import React, { useCallback, useState } from 'react'

import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import { columns } from './table-header'
import { useListInvoiceStore } from '../../store'
import { useEmailTransactionData } from 'src/@core/hooks/invoice/useEmailTransactionList'

export const ContentTab = () => {
  const { keyword } = useListInvoiceStore((state: any) => state.searchTabStore)
  const [page, setPage] = useState<number>(1)
  const [limit] = useState<number>(10)

  const { data: email_transactions, isLoading: isEmailTransactionsLoading } = useEmailTransactionData({
    page: page,
    limit,
    keyword
  })

  const onChangePagination = useCallback((pagination: { page: number; pageSize: number }) => {
    setPage(pagination.page + 1)
  }, [])

  return (
    <Box mt={3}>
      {email_transactions && (
        <DataGrid
          rows={email_transactions.data}
          columns={columns}
          loading={isEmailTransactionsLoading}
          onPaginationModelChange={onChangePagination}
          pageSizeOptions={[5, 10, 15, 20]}
          paginationModel={{
            page: page - 1,
            pageSize: limit
          }}
          style={{
            border: 'none'
          }}
          checkboxSelection
          paginationMode='server'
        />
      )}
    </Box>
  )
}

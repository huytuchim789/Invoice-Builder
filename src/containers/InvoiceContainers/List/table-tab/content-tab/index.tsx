import React, { useCallback, useState, useEffect } from 'react'

import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import { columns } from './table-header'
import { useListInvoiceStore } from '../../store'
import { useEmailTransactionData } from 'src/@core/hooks/invoice/useEmailTransactionList'
import { pusher } from 'src/@core/common/pusher'
import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'
import { useQueryClient } from '@tanstack/react-query'

export const ContentTab = () => {
  const queryClient = useQueryClient()
  const { keyword } = useListInvoiceStore((state: any) => state.searchTabStore)
  const [page, setPage] = useState<number>(0)
  const [limit] = useState<number>(10)

  const { data: email_transactions, isLoading: isEmailTransactionsLoading } = useEmailTransactionData({
    page: page,
    limit,
    keyword
  })

  useEffect(() => {
    const channel = pusher.subscribe('email-transactions')
    const oldTransaction = queryClient.getQueryData([QUERY_INVOICE_KEYS.EMAIL_TRANSACTION, page, limit, keyword])

    console.log(oldTransaction)
    channel.bind('list-updated', function (data: any) {
      console.log(data)
    })
  }, [email_transactions])

  const onChangePagination = useCallback((pagination: { page: number; pageSize: number }) => {
    setPage(pagination.page)
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
            page: page,
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

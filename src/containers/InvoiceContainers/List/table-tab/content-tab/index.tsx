import React, { useCallback, useState, useEffect } from 'react'

import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import { columns } from './table-header'
import { useListInvoiceStore } from '../../store'
import { useEmailTransactionData } from 'src/@core/hooks/invoice/useEmailTransactionList'
import { pusher } from 'src/@core/common/pusher'
import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'
import { useQueryClient } from '@tanstack/react-query'
import { updateData } from 'src/@core/utils/update-data'
import { globalStore } from 'src/@core/hocs/global-store'

export const ContentTab = () => {
  const queryClient = useQueryClient()
  const { user } = globalStore((state: any) => state.userStore)
  const { keyword } = useListInvoiceStore((state: any) => state.searchTabStore)
  const [page, setPage] = useState<number>(0)
  const [limit] = useState<number>(10)

  const { data: email_transactions, isLoading: isEmailTransactionsLoading } = useEmailTransactionData({
    page: page,
    limit,
    keyword
  })

  useEffect(() => {
    if (email_transactions && user.id) {
      const channel = pusher.subscribe(`private-sender=${user.id}_email-transactions_page=1`)
      const { data: transactions } = queryClient.getQueryData([
        QUERY_INVOICE_KEYS.EMAIL_TRANSACTION,
        page,
        limit,
        keyword
      ]) as { data: any[] }

      channel.bind('list-updated', function (data: any) {
        console.log(data)

        // const newData = updateData(
        //   transactions,
        //   data.emailTransactions.data[0].id,
        //   'status',
        //   data.emailTransactions.data[0].status
        // )

        // console.log(newData)

        // queryClient.setQueryData([QUERY_INVOICE_KEYS.EMAIL_TRANSACTION, page, limit, keyword], newData)
      })
    }
  }, [email_transactions, user])

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

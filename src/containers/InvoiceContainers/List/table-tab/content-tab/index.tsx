import React, { useCallback, useState, useEffect } from 'react'

import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import { columns } from './table-header'
import { useListInvoiceStore } from '../../store'
import { useEmailTransactionData } from 'src/@core/hooks/invoice/useEmailTransactionList'
import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'
import { useQueryClient } from '@tanstack/react-query'
import { updateData } from 'src/@core/utils/update-data'
import { globalStore } from 'src/@core/hocs/global-store'
import { pusher } from 'src/@core/common/pusher'

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
      const channel = pusher.subscribe(`private-sender=${user.id}_email-transactions_page=${page + 1}`)

      channel.bind('list-updated', function (data: any) {
        const newData = updateData(email_transactions.data, data.emailTransaction.id, data.emailTransaction)

        queryClient.setQueryData([QUERY_INVOICE_KEYS.EMAIL_TRANSACTION, page, limit, keyword], {
          ...email_transactions,
          data: newData
        })

        queryClient.invalidateQueries([QUERY_INVOICE_KEYS.NOTIFICATION_LIST])
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

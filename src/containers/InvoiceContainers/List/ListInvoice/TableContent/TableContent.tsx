import React, { useCallback, useState, useEffect } from 'react'

import { Box, SelectChangeEvent } from '@mui/material'
import { useListInvoiceStore } from '../../store'
import { useEmailTransactionData } from 'src/@core/hooks/invoice/useEmailTransactionList'
import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'
import { useQueryClient } from '@tanstack/react-query'
import { updateData } from 'src/@core/utils/update-data'
import { globalStore } from 'src/@core/hocs/global-store'
import { pusher } from 'src/@core/common/pusher'
import TableCommon from 'src/@core/components/TableCommon/TableCommon'
import { columns } from './TableHeader/TableHeader'

const TableContent = () => {
  const queryClient = useQueryClient()
  const { user } = globalStore((state: any) => state.userStore)

  const [status, rangeDate, searchTab] = useListInvoiceStore(state => [
    state.invoiceStatusStore,
    state.rangeDateStore,
    state.searchTabStore
  ])

  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(5)

  const { data: email_transactions, isLoading: isEmailTransactionsLoading } = useEmailTransactionData({
    page: page,
    limit,
    keyword: searchTab.keyword,
    status: status.invoiceStatus,
    startDate: rangeDate.rangeDate[0],
    endDate: rangeDate.rangeDate[1]
  })

  useEffect(() => {
    if (email_transactions && user.id) {
      const channel = pusher.subscribe(`private-sender=${user.id}_email-transactions_page=${page}`)

      channel.bind('list-updated', function (data: any) {
        const newData = updateData(email_transactions.data, data.emailTransaction.id, data.emailTransaction)
        queryClient.setQueryData(
          [
            QUERY_INVOICE_KEYS.EMAIL_TRANSACTION,
            page,
            limit,
            searchTab.keyword,
            status.invoiceStatus,
            rangeDate.rangeDate[0],
            rangeDate.rangeDate[1]
          ],
          {
            ...email_transactions,
            data: newData
          }
        )
      })
    }
  }, [email_transactions, user])

  const onChangePagination = useCallback((_event: any, page: number) => {
    setPage(page)
  }, [])

  const handleChangeLimit = (event: SelectChangeEvent<number>) => {
    setLimit(Number(event.target.value))
  }

  return (
    <Box mt={3}>
      <TableCommon
        data={email_transactions?.data ?? []}
        isLoading={isEmailTransactionsLoading}
        headerData={columns}
        pagination={{
          handleChangeLimit: handleChangeLimit,
          totalPage: email_transactions?.current_page,
          handleChangePage: onChangePagination
        }}
        checkable={true}
      />
    </Box>
  )
}

export default TableContent

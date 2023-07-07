import { useCallback, useEffect, useState } from 'react'

import useListInvoiceStore from '../store'

import { useRouter } from 'next/router'
import { ISearchTabStore } from './store/search'
import { IInvoiceStatusState } from '../FilterSelect/store/status'
import { IRangeDateState } from '../FilterSelect/store/rangeDate'
import { useEmailTransactionData } from 'src/@core/hooks/invoice/useEmailTransactionList'
import { pusher } from 'src/@core/common/pusher'
import { globalStore } from 'src/@core/hocs/global-store'
import { useQueryClient } from '@tanstack/react-query'
import { updateData } from 'src/@core/utils/update-data'
import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'
import { SelectChangeEvent } from '@mui/material'

interface IStore {
  searchInvoice: ISearchTabStore
  invoiceStatusStore: IInvoiceStatusState
  rangeDateStore: IRangeDateState
}

const ctx: Types.ControllerContext<IStore> = {}

const useListInvoiceController = () => {
  ctx.router = useRouter()
  ctx.store = useListInvoiceStore()
  const queryClient = useQueryClient()

  const { query } = ctx.router
  const { searchInvoice, invoiceStatusStore, rangeDateStore } = ctx.store
  const { user } = globalStore((state: any) => state.userStore)

  const [page, setPage] = useState<number>(query.page ? Number(query.page) : 1)
  const [limit, setLimit] = useState<number>(query.limit ? Number(query.limit) : 5)

  const { data: email_transactions, isLoading: isEmailTransactionsLoading } = useEmailTransactionData({
    page,
    limit,
    keyword: String(query.keyword || searchInvoice.keyword),
    status: String(query.status || invoiceStatusStore.invoiceStatus),
    startDate: String(query.startDate || rangeDateStore.rangeDate[0]),
    endDate: String(query.endDate || rangeDateStore.rangeDate[1])
  })

  useEffect(() => {
    if (query.keyword) {
      searchInvoice.setKeyword(query.keyword)
    }

    if (query.status) {
      invoiceStatusStore.setInvoiceStatus(String(query.status))
    }

    if (query.startDate && query.endDate) {
      rangeDateStore.setRangeDate([String(query.startDate), String(query.endDate)])
    }
  }, [])

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
            searchInvoice.keyword,
            invoiceStatusStore.invoiceStatus,
            rangeDateStore.rangeDate[0],
            rangeDateStore.rangeDate[1]
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

    if (!ctx.router) return

    ctx.router.push({
      pathname: '/invoice/list',
      query: {
        ...ctx.router.query,
        page: page
      }
    })
  }, [])

  const handleChangeLimit = (event: SelectChangeEvent<number>) => {
    setLimit(Number(event.target.value))

    if (!ctx.router) return

    ctx.router.push({
      pathname: '/invoice/list',
      query: {
        ...ctx.router.query,
        limit: event.target.value
      }
    })
  }

  return {
    email_transactions,
    isEmailTransactionsLoading,
    onChangePagination,
    handleChangeLimit
  }
}

export default useListInvoiceController

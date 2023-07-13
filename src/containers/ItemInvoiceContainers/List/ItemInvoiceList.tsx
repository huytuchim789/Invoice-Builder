import { Card, SelectChangeEvent } from '@mui/material'
import { useRouter } from 'next/router'
import { createContext, useCallback, useState } from 'react'
import useItemsInvoiceListData from 'src/@core/hooks/invoice/useItemInvoiceList'

export const ItemInvoiceContext = createContext({})

const ItemInvoiceList = () => {
  const router = useRouter()
  const { query } = router
  const [page, setPage] = useState<number>(Number(query.page || 1))
  const [limit, setLimit] = useState<number>(Number(query.limit || 10))
  const [keyword, setKeyword] = useState<string>(String(query.keyword || ''))

  const { data: items_invoice, isLoading: isItemInvoiceLoading } = useItemsInvoiceListData({ page, limit, keyword })

  console.log(items_invoice)
  const onChangePagination = useCallback((_event: any, page: number) => {
    setPage(page)

    router.push({
      pathname: '/customer/list',
      query: {
        ...router.query,
        page: page
      }
    })
  }, [])

  const handleChangeLimit = (event: SelectChangeEvent<number>) => {
    setLimit(Number(event.target.value))

    router.push({
      pathname: '/customer/list',
      query: {
        ...router.query,
        limit: event.target.value
      }
    })
  }

  const data = {
    keyword,
    setKeyword
  }

  return (
    <ItemInvoiceContext.Provider value={data}>
      <Card></Card>
    </ItemInvoiceContext.Provider>
  )
}

export default ItemInvoiceList

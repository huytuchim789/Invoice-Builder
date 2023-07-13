import { createContext, useCallback, useState } from 'react'

import { Card, SelectChangeEvent } from '@mui/material'

import { columns } from './header-tab'
import FilterHeaderTable from './filter-tab'
import { useRouter } from 'next/router'
import TableCommon from 'src/@core/components/TableCommon/TableCommon'
import useItemListData from 'src/@core/hooks/invoice/useItem'

export const ItemListContext = createContext({})

const ItemListTableContent = () => {
  const router = useRouter()
  const { query } = router
  const [page, setPage] = useState<number>(Number(query.page || 1))
  const [limit, setLimit] = useState<number>(Number(query.limit || 10))
  const [keyword, setKeyword] = useState<string>(String(query.keyword || ''))

  const { data: item_list, isLoading: isCustomerListLoading } = useItemListData({ page, limit, keyword })

  const onChangePagination = useCallback((_event: any, page: number) => {
    setPage(page)

    router.push({
      pathname: '/item/list',
      query: {
        ...router.query,
        page: page
      }
    })
  }, [])

  const handleChangeLimit = (event: SelectChangeEvent<number>) => {
    setLimit(Number(event.target.value))

    router.push({
      pathname: '/item/list',
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
    <ItemListContext.Provider value={data}>
      <Card>
        <FilterHeaderTable />
        {item_list && (
          <TableCommon
            data={item_list?.data ?? []}
            isLoading={isCustomerListLoading}
            headerData={columns}
            pagination={{
              currentLimit: limit,
              handleChangeLimit: handleChangeLimit,
              totalPage: item_list?.last_page,
              handleChangePage: onChangePagination
            }}
            checkable={true}
          />
        )}
      </Card>
    </ItemListContext.Provider>
  )
}

export default ItemListTableContent

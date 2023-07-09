import { createContext, useCallback, useState } from 'react'

import { Card, SelectChangeEvent } from '@mui/material'

import { columns } from './header-tab'
import FilterHeaderTable from './filter-tab'
import { useRouter } from 'next/router'
import TableCommon from 'src/@core/components/TableCommon/TableCommon'
import useCustomerListData from 'src/@core/hooks/invoice/useCustomerList'

export const CustomerListContext = createContext({})

const CustomerListTableContent = () => {
  const router = useRouter()
  const { query } = router
  const [page, setPage] = useState<number>(Number(query.page || 1))
  const [limit, setLimit] = useState<number>(Number(query.limit || 10))
  const [keyword, setKeyword] = useState<string>(String(query.keyword || ''))

  const { data: customer_list, isLoading: isCustomerListLoading } = useCustomerListData({ page, limit, keyword })

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
    <CustomerListContext.Provider value={data}>
      <Card>
        <FilterHeaderTable />
        {customer_list && (
          <TableCommon
            data={customer_list?.data ?? []}
            isLoading={isCustomerListLoading}
            headerData={columns}
            pagination={{
              currentLimit: limit,
              handleChangeLimit: handleChangeLimit,
              totalPage: customer_list?.last_page,
              handleChangePage: onChangePagination
            }}
            checkable={true}
          />
        )}
      </Card>
    </CustomerListContext.Provider>
  )
}

export default CustomerListTableContent

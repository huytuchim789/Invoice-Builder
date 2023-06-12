import { useCallback, useState } from 'react'

import { Card, styled } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import { columns } from './header-tab'
import { useSelectUserInvoiceTo } from 'src/@core/hooks/invoice/useSelectUserInvoiceTo'
import FilterHeaderTable from './filter-tab'

const CustomerListTable = styled(DataGrid)({
  '& .MuiDataGrid-columnHeader:focus, .MuiDataGrid-cell:focus': {
    border: 'none'
  },
  '& .MuiDataGrid-cell:focus-within': {
    outline: 'none'
  }
})

const CustomerListTableContent = () => {
  const [page, setPage] = useState<number>(0)
  const [limit] = useState<number>(10)

  const { data: customer_list, isLoading: isCustomerListLoading } = useSelectUserInvoiceTo()

  const onChangePagination = useCallback((pagination: { page: number; pageSize: number }) => {
    setPage(pagination.page)
  }, [])

  return (
    <Card>
      <FilterHeaderTable />
      {customer_list && (
        <CustomerListTable
          rows={customer_list}
          columns={columns}
          loading={isCustomerListLoading}
          pageSizeOptions={[5, 10, 15, 20]}
          onPaginationModelChange={onChangePagination}
          paginationModel={{
            page: page,
            pageSize: limit
          }}
          style={{
            border: 'none'
          }}
          disableRowSelectionOnClick
          checkboxSelection
          paginationMode='server'
        />
      )}
    </Card>
  )
}

export default CustomerListTableContent

import React, { useCallback, useState } from 'react'

import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import { useInvoiceData } from 'src/@core/hooks/invoice/useInvoiceData'
import { columns } from './table-header'

export const ContentTab = () => {
  const [page, setPage] = useState<number>(0)
  const [limit] = useState<number>(10)

  const { data: invoice_list, isLoading: isInvoiceListLoading } = useInvoiceData({ page: page, limit })

  const onChangePagination = useCallback((pagination: { page: number; pageSize: number }) => {
    setPage(pagination.page)
  }, [])

  return (
    <Box mt={3}>
      {invoice_list && (
        <DataGrid
          rows={invoice_list.data}
          columns={columns}
          loading={isInvoiceListLoading}
          onPaginationModelChange={onChangePagination}
          pageSizeOptions={[5, 10, 15, 20]}
          paginationModel={{
            page: page,
            pageSize: limit
          }}
          paginationMode='server'
          style={{
            border: 'none'
          }}
          checkboxSelection
        />
      )}
    </Box>
  )
}

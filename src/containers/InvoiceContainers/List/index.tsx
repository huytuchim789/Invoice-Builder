import { Box } from '@mui/material'
import { FilterTab } from './filter-tab'
import { useInvoiceData } from 'src/@core/hooks/invoice/useInvoiceData'
import { createContext } from 'react'
import { ContentTab } from './table-tab/content-tab'

export const InvoiceListContext = createContext({})

export const InvoiceList = () => {
  const { data: invoice_list, isLoading: isInvoiceListLoading } = useInvoiceData()

  return (
    <InvoiceListContext.Provider value={{ data: invoice_list, loading: isInvoiceListLoading }}>
      <FilterTab />
      <Box>
        <ContentTab />
      </Box>
    </InvoiceListContext.Provider>
  )
}

import { useQuery } from '@tanstack/react-query'
import axiosInstance from 'src/@core/common/axios'

import { IInvoiceDataResponse } from 'src/@core/models/api/invoice/invoice.interface'

import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'

interface Params {
  page: number
  limit: number
  keyword: string
}

const getInvoiceData = async ({ page, limit, keyword }: Params) => {
  const { data } = (await axiosInstance.get(`invoices?page=${page}&limit=${limit}&keyword=${keyword}`)) as {
    data: IInvoiceDataResponse
  }

  return data.data
}

export const useInvoiceData = ({ page, limit, keyword }: Params) => {
  return useQuery({
    queryKey: [QUERY_INVOICE_KEYS.INVOICE_LIST, page, limit, keyword],
    queryFn: () => getInvoiceData({ page, limit, keyword }),
    retry: 0
  })
}

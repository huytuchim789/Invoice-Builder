import { useQuery } from '@tanstack/react-query'
import axiosInstance from 'src/@core/common/axios'

import { IInvoiceDataResponse } from 'src/@core/models/api/invoice/invoice.interface'

import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'

interface Params {
  page: number
  limit: number
}

const getInvoiceData = async ({ page, limit }: Params) => {
  const { data } = (await axiosInstance.get(`invoices?page=${page + 1}&limit=${limit}`)) as {
    data: IInvoiceDataResponse
  }

  return data.data
}

export const useInvoiceData = ({ page, limit }: Params) => {
  return useQuery({
    queryKey: [QUERY_INVOICE_KEYS.INVOICE_LIST, page, limit],
    queryFn: () => getInvoiceData({ page, limit }),
    retry: 0
  })
}

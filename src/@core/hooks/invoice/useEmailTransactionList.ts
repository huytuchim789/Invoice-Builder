import { useQuery } from '@tanstack/react-query'
import axiosInstance from 'src/@core/common/axios'

import { IEmailTransationDataResponse } from 'src/@core/models/api/email-transaction/index.interface'

import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'

interface Params {
  page: number
  limit: number
  keyword: string
}

const getEmailTransactionData = async ({ page, limit, keyword }: Params) => {
  const { data } = (await axiosInstance.get(`email-transactions?page=${page}&limit=${limit}&keyword=${keyword}`)) as {
    data: IEmailTransationDataResponse
  }

  return data.data
}

export const useEmailTransactionData = ({ page, limit, keyword }: Params) => {
  return useQuery({
    queryKey: [QUERY_INVOICE_KEYS.EMAIL_TRANSACTION, page, limit, keyword],
    queryFn: () => getEmailTransactionData({ page, limit, keyword }),
    staleTime: 2 * 60 * 1000,
    retry: 0
  })
}

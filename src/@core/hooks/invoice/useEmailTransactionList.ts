import { useQuery } from '@tanstack/react-query'
import axiosInstance from 'src/@core/common/axios'

import { IEmailTransationDataResponse } from 'src/@core/models/api/email-transaction/index.interface'

import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'

interface Params {
  page: number
  limit: number
  keyword: string
  status: string
  startDate: string
  endDate: string
}

const getEmailTransactionData = async ({ page, limit, keyword, status, startDate, endDate }: Params) => {
  const { data } = (await axiosInstance.get(
    `email-transactions?page=${page}&limit=${limit}&keyword=${keyword}&status=${status}&startDate=${startDate}&endDate=${endDate}`
  )) as {
    data: IEmailTransationDataResponse
  }

  return data.data
}

export const useEmailTransactionData = ({ page, limit, keyword, status, startDate, endDate }: Params) => {
  return useQuery({
    queryKey: [QUERY_INVOICE_KEYS.EMAIL_TRANSACTION, page, limit, keyword, status, startDate, endDate],
    queryFn: () => getEmailTransactionData({ page, limit, keyword, status, startDate, endDate }),
    staleTime: 2 * 60 * 1000,
    retry: 0
  })
}

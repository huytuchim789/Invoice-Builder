import { useQuery } from '@tanstack/react-query'
import axiosInstance from 'src/@core/common/axios'

import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'

const getTotalSumInvoiceInMonth = async () => {
  const { data } = await axiosInstance.get('dashboard/get-total-invoices-sum-in-month')
  return data?.data
}
const getAnalyticsInvoice = async () => {
  const { data } = await axiosInstance.get('dashboard/get-analytics')
  return data?.data
}
const getPaymentsHistory = async () => {
  const { data } = await axiosInstance.get('dashboard/payment-history')
  return data?.data
}
export const useTotalSumInvoiceInMonthData = () => {
  return useQuery({
    queryKey: [QUERY_INVOICE_KEYS.TOTAL_SUM_INVOICE_IN_MONTH],
    queryFn: () => getTotalSumInvoiceInMonth()
  })
}

export const useAnalyticsInvoiceData = () => {
  return useQuery({
    queryKey: [QUERY_INVOICE_KEYS.ANALYTICS_INVOICE],
    queryFn: () => getAnalyticsInvoice()
  })
}

export const usePaymentsHistoryData = () => {
  return useQuery({
    queryKey: [QUERY_INVOICE_KEYS.PAYMENTS_HISTORY],
    queryFn: () => getPaymentsHistory()
  })
}

import { useQuery } from '@tanstack/react-query'
import axiosInstance from 'src/@core/common/axios'

import { IInvoiceDataResponse } from 'src/@core/models/api/invoice/invoice.interface'

import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'

const getInvoiceData = async () => {
  const { data } = (await axiosInstance.get(`invoices`)) as { data: IInvoiceDataResponse }

  return data.data
}

export const useInvoiceData = () => {
  return useQuery({
    queryKey: [QUERY_INVOICE_KEYS.INVOICE_LIST],
    queryFn: getInvoiceData
  })
}

import { useQuery } from '@tanstack/react-query'
import axiosInstance from 'src/@core/common/axios'

import { IInvoiceDetailDataResponse } from 'src/@core/models/api/invoice/invoice.interface'

import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'

const getInvoiceDetailData = async (id: string | string[]) => {
  const { data } = (await axiosInstance.get(`invoices/${id}`)) as { data: IInvoiceDetailDataResponse }

  return data.data
}

export const useInvoiceDetailData = (id: string | string[]) => {
  return useQuery({
    queryKey: [QUERY_INVOICE_KEYS.INVOICE_DETAIL, id],
    queryFn: () => getInvoiceDetailData(id),
    enabled: id !== ''
  })
}

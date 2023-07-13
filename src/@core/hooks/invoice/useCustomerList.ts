import { useQuery } from '@tanstack/react-query'

import axiosInstance from 'src/@core/common/axios'

import { IUserSelectInvoiceToDataResponse } from 'src/@core/models/api/invoice/invoice.interface'

import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'

interface Params {
  limit: number
  page: number
  keyword: string
}

const getCustomerListData = async ({ limit, page, keyword }: Params) => {
  const { data } = (await axiosInstance.get(`customers?limit=${limit}&page=${page}&keyword=${keyword}`)) as {
    data: IUserSelectInvoiceToDataResponse
  }

  return data.data
}

const useCustomerListData = ({ limit, page, keyword }: Params) => {
  return useQuery({
    queryKey: [QUERY_INVOICE_KEYS.CUSTOMER_LIST, limit, page, keyword],
    queryFn: () => getCustomerListData({ limit, page, keyword })
  })
}

export default useCustomerListData

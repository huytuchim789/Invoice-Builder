import { useQuery } from '@tanstack/react-query'
import axiosInstance from 'src/@core/common/axios'

import { IUserSelectInvoiceToDataResponse } from 'src/@core/models/api/invoice/invoice.interface'

import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'

const getSelectUserData = async () => {
  const { data } = (await axiosInstance.get('customers')) as { data: IUserSelectInvoiceToDataResponse }

  return data.data
}

export const useSelectUserInvoiceTo = () => {
  return useQuery({
    queryKey: [QUERY_INVOICE_KEYS.USER_SELECT],
    queryFn: getSelectUserData,
    refetchOnWindowFocus: false,
    refetchInterval: false
  })
}

import { useQuery } from '@tanstack/react-query'

import axiosInstance from 'src/@core/common/axios'
import { IItemsInvoiceSelectListDataResponse } from 'src/@core/models/api/invoice/invoice.interface'

import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'

const getItemsInvoiceListData = async () => {
  const { data } = (await axiosInstance.get(`items/all`)) as {
    data: IItemsInvoiceSelectListDataResponse
  }

  return data.data
}

const useItemsInvoiceListData = () => {
  return useQuery({
    queryKey: [QUERY_INVOICE_KEYS.ITEMS_INVOICE_SELECT_LIST],
    queryFn: () => getItemsInvoiceListData()
  })
}

export default useItemsInvoiceListData

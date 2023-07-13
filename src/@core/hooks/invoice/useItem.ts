import { useQuery } from '@tanstack/react-query'

import axiosInstance from 'src/@core/common/axios'

import { IItemsDataResponse } from 'src/@core/models/api/invoice/invoice.interface'

import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'

interface Params {
  limit: number
  page: number
  keyword: string
}

const getItemList = async ({ limit, page, keyword }: Params) => {
  const { data } = (await axiosInstance.get(`items?limit=${limit}&page=${page}&keyword=${keyword}`)) as {
    data: IItemsDataResponse
  }

  return data.data
}

const useItemListData = ({ limit, page, keyword }: Params) => {
  return useQuery({
    queryKey: [QUERY_INVOICE_KEYS.ITEMS_INVOICE, limit, page, keyword],
    queryFn: () => getItemList({ limit, page, keyword })
  })
}

export default useItemListData

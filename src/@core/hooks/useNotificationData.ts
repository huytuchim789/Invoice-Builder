import { useQuery } from '@tanstack/react-query'
import axiosInstance from 'src/@core/common/axios'

import { INotificationListDataResponse } from '../models/api/notification.interface'

import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'

interface Params {
  page: number
  limit: number
  keyword: string
}

const getNotificationListData = async ({ page, limit, keyword }: Params) => {
  const { data } = (await axiosInstance.get(`notifications?page=${page}&limit=${limit}&keyword=${keyword}`)) as {
    data: { data: { notifications: INotificationListDataResponse } }
  }

  return data.data.notifications
}

export const useNotificationListData = ({ page, limit, keyword }: Params) => {
  return useQuery({
    queryKey: [QUERY_INVOICE_KEYS.NOTIFICATION_LIST, page, limit, keyword],
    queryFn: () => getNotificationListData({ page, limit, keyword }),
    retry: 0
  })
}

import { useQuery } from '@tanstack/react-query'
import axiosInstance from 'src/@core/common/axios'

import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'
import { IMessengerResponse } from '../models/api/messegner.interface'

const getMessages = async () => {
  const { data } = (await axiosInstance.get(`messengers`)) as { data: IMessengerResponse }
  return data
}

export const useMessengers = () => {
  return useQuery({
    queryKey: [QUERY_INVOICE_KEYS.MESSENGER_LIST],
    queryFn: () => getMessages(),
    retry: 0
  })
}

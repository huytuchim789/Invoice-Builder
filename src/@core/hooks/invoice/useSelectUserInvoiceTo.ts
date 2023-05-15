import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { IUserSelectInvoiceTo } from 'src/@core/models/api/invoice.interface'
import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'

const getSelectUserData = async () => {
  const { data } = (await axios.get('https://62f29501b1098f150815e793.mockapi.io/select')) as {
    data: IUserSelectInvoiceTo[]
  }

  return data
}

export const useSelectUserInvoiceTo = () => {
  return useQuery([QUERY_INVOICE_KEYS.USER_SELECT], getSelectUserData, {
    refetchOnWindowFocus: false,
    refetchInterval: false
  })
}

import { useQuery } from '@tanstack/react-query'

import { checkSubcribe } from 'src/@core/utils/api/payment'

import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'

const useCheckSubcribe = () => {
  return useQuery({
    queryKey: [QUERY_INVOICE_KEYS.CHECK_SUBCRIBE],
    queryFn: checkSubcribe
  })
}

export default useCheckSubcribe

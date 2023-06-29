import { useQuery } from '@tanstack/react-query'

import { getCard } from 'src/@core/utils/api/payment'

import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'

const useCardInfo = () => {
  return useQuery({
    queryKey: [QUERY_INVOICE_KEYS.CARD_INFO],
    queryFn: getCard
  })
}

export default useCardInfo

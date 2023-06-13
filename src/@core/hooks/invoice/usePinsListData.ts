import { useQuery } from '@tanstack/react-query'

import { getPins } from 'src/@core/utils/api/invoice/review'

import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'

export const useInvoiceDetailData = (invoiceId: string) => {
  return useQuery({
    queryKey: [QUERY_INVOICE_KEYS.PIN_LIST, invoiceId],
    queryFn: () => getPins(invoiceId),
    enabled: invoiceId !== ''
  })
}

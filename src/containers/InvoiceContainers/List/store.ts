import { useInvoiceStatusStore, useRangeDateStore } from './FilterSelect/store'
import { useSearchInvoiceStore } from './ListInvoice/store'

const useListInvoiceStore = () => {
  const searchInvoice = useSearchInvoiceStore()
  const invoiceStatusStore = useInvoiceStatusStore()
  const rangeDateStore = useRangeDateStore()

  return {
    searchInvoice,
    invoiceStatusStore,
    rangeDateStore
  }
}

export default useListInvoiceStore

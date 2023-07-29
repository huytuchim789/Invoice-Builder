import { useDateInfoStore } from './DateInfo/store'
import { useItemContentStore } from './ItemInfo/store'
import { useSendingMethodStore } from './SendingMethodSelect/store'

const useInvoiceStore = () => {
  const itemInfo = useItemContentStore()
  const dateInfo = useDateInfoStore()
  const methodSending = useSendingMethodStore()

  return {
    dateInfo,
    itemInfo,
    methodSending
  }
}

export default useInvoiceStore

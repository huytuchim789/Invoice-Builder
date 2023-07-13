import { useDateInfoStore } from './DateInfo/store'
import { useInvoiceIdStore } from './InvoiceIdInfo/store'
import { useItemContentStore } from './ItemInfo/store'
import { useNoteInfoStore } from './NoteInfo/store'
import { useSendingMethodStore } from './SendingMethodSelect/store'
import { useUserSelectStore } from './UserInfoSelect/store'

const useInvoiceStore = () => {
  const userSelectInfo = useUserSelectStore()
  const itemInfo = useItemContentStore()
  const noteInfo = useNoteInfoStore()
  const dateInfo = useDateInfoStore()
  const invoiceId = useInvoiceIdStore()
  const methodSending = useSendingMethodStore()

  return {
    userSelectInfo,
    noteInfo,
    dateInfo,
    itemInfo,
    invoiceId,
    methodSending
  }
}

export default useInvoiceStore

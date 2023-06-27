import { useDateInfoStore } from './DateInfo/store'
import { useInvoiceIdStore } from './InvoiceIdInfo/store'
import { useItemContentStore } from './ItemInfo/store'
import { useNoteInfoStore } from './NoteInfo/store'
import { useUserSelectStore } from './UserInfoSelect/store'

const useInvoiceStore = () => {
  const userSelectInfo = useUserSelectStore()
  const itemInfo = useItemContentStore()
  const noteInfo = useNoteInfoStore()
  const dateInfo = useDateInfoStore()
  const invoiceId = useInvoiceIdStore()

  return {
    userSelectInfo,
    noteInfo,
    dateInfo,
    itemInfo,
    invoiceId
  }
}

export default useInvoiceStore

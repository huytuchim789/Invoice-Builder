import { useDateInfoStore } from './DateInfo/store'
import { useItemContentStore } from './ItemInfo/store'
import { useNoteInfoStore } from './NoteInfo/store'
import { useUserSelectStore } from './UserInfoSelect/store'

const useInvoiceStore = () => {
  const userSelectInfo = useUserSelectStore()
  const itemInfo = useItemContentStore()
  const noteInfo = useNoteInfoStore()
  const dateInfo = useDateInfoStore()

  return {
    userSelectInfo,
    noteInfo,
    dateInfo,
    itemInfo
  }
}

export default useInvoiceStore

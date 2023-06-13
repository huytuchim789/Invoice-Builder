import { useMemo } from 'react'
import { globalStore } from 'src/@core/hocs/global-store'
import { useInvoiceEditStore } from '../../store'

export function useInvoiceEditStoreData() {
  const { user } = globalStore((state: any) => state.userStore)

  const [userSelect, items, dateSelect, noteSelect] = useInvoiceEditStore((state: any) => [
    state.userSelectTabStore,
    state.itemContentTabStore,
    state.dateSelectStore,
    state.noteTabStore
  ])

  const invoice_detail = useMemo(() => {
    return {
      id: '',
      updated_at: dateSelect.date.end,
      created_at: dateSelect.date.start,
      issued_date: dateSelect.date.end,
      created_date: dateSelect.date.start,
      note: noteSelect.note,
      tax: 21,
      sale_person: user?.name,
      customer_id: userSelect.user.id,
      items: items.itemContent,
      total: items.subTotal + (items.subTotal * 21) / 100,
      customer: userSelect.user
    }
  }, [user, userSelect, items, dateSelect, noteSelect])

  return {
    invoice_detail
  }
}

//@ts-nocheck
import { useMemo } from 'react'
import { globalStore } from 'src/@core/hocs/global-store'
import useInvoiceStore from 'src/@core/components/Invoice/store'
import { useSettingStore } from 'src/views/account-settings/store'

export function useInvoiceDetailStoreData() {
  const { user } = globalStore((state: any) => state.userStore)
  const { info } = useSettingStore()

  const { itemInfo, userSelectInfo, noteInfo, dateInfo } = useInvoiceStore()

  const invoice_detail = useMemo(() => {
    return {
      id: '',
      updated_at: dateInfo.date.end,
      created_at: dateInfo.date.start,
      issued_date: dateInfo.date.end,
      created_date: dateInfo.date.start,
      note: noteInfo.note,
      tax: 21,
      sale_person: user?.name,
      customer_id: userSelectInfo.user.id,
      items: itemInfo.itemContent,
      total: itemInfo.subTotal + (itemInfo.subTotal * 21) / 100,
      customer: userSelectInfo.user,
      business: info
    }
  }, [user, itemInfo, userSelectInfo, noteInfo, dateInfo, info])

  return {
    invoice_detail
  }
}

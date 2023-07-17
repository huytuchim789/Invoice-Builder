import { useEffect } from 'react'
import { IStore, useItemContentStore } from './store'
import useItemsInvoiceListData from 'src/@core/hooks/invoice/useItemInvoiceList'

const ctx: Types.ControllerContext<IStore> = {}

export function useItemInfoController() {
  ctx.store = useItemContentStore()
  const { data: items } = useItemsInvoiceListData()

  useEffect(() => {
    if (items) {
      ctx.store?.setItemsInvoiceSelectList(items)
    }
  }, [items])

  return {
    store: ctx.store
  }
}

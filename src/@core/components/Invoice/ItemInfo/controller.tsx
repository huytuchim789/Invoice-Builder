import { ChangeEvent, useCallback, useEffect } from 'react'
import { IStore, useItemContentStore } from './store'
import { SelectChangeEvent } from '@mui/material'
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

  const handleChangeInputItem = useCallback(
    (props: string, index: number, type: 'string' | 'number') =>
      (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        return ctx.store?.setItemContent(
          type === 'string' ? event.target.value : Number(event.target.value),
          props,
          index
        )
      },
    []
  )

  const handleChangeSelectItem = useCallback(
    (props: string, index: number) => (event: SelectChangeEvent<string>) => {
      return ctx.store?.setItemContent(event.target.value, props, index)
    },
    []
  )

  const handleCreateItem = useCallback(() => {
    return ctx.store?.addItemContent()
  }, [])

  const handleDeleteItem = useCallback((index: number) => {
    return ctx.store?.deleteItemContent(index)
  }, [])

  return {
    itemContent: ctx.store.itemContent,
    handleChangeInputItem,
    handleChangeSelectItem,
    handleCreateItem,
    handleDeleteItem
  }
}

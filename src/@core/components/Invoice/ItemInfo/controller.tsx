import { ChangeEvent } from 'react'
import { IStore, useItemContentStore } from './store'
import { SelectChangeEvent } from '@mui/material'

const ctx: Types.ControllerContext<IStore> = {}

export function useItemInfoController() {
  ctx.store = useItemContentStore()

  const handleChangeInputItem =
    (props: string, index: number, type: 'string' | 'number') =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      return ctx.store?.setItemContent(
        type === 'string' ? event.target.value : Number(event.target.value),
        props,
        index
      )
    }

  const handleChangeSelectItem = (props: string, index: number) => (event: SelectChangeEvent<string>) => {
    return ctx.store?.setItemContent(event.target.value, props, index)
  }

  const handleCreateItem = () => {
    return ctx.store?.addItemContent()
  }

  const handleDeleteItem = (index: number) => {
    return ctx.store?.deleteItemContent(index)
  }

  return {
    itemContent: ctx.store.itemContent,
    handleChangeInputItem,
    handleChangeSelectItem,
    handleCreateItem,
    handleDeleteItem
  }
}

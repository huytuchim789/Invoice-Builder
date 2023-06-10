import { ChangeEventHandler, useContext } from 'react'
import { useInvoiceEditStore } from '../../../store'
import { ItemEditContext } from '../table-body'
import { IItemContent } from '../../store'
import { SelectChangeEvent } from '@mui/material'

const ctx: Types.ControllerContext<any> = {}

const data_string = ['name', 'description']

export function useEditItemInvoice() {
  const { data, count } = useContext(ItemEditContext) as { data: IItemContent; count: number }

  ctx.store = useInvoiceEditStore((state: any) => state.itemContentTabStore)

  const handleEditItem =
    (props: string) =>
    (
      event:
        | {
            target: { value: string }
          }
        | SelectChangeEvent<string>
    ): ChangeEventHandler<(HTMLInputElement | HTMLTextAreaElement) & HTMLSelectElement> => {
      let dataItem: string | number = event.target.value

      if (!data_string.includes(props)) {
        dataItem = Number(dataItem)
      }

      return ctx.store.setItemContent(dataItem, props, count)
    }

  const handleAddOneMoreItem = () => ctx.store.addItemContent()

  return { data, handleEditItem, handleAddOneMoreItem }
}

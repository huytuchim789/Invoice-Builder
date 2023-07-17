import { produce } from 'immer'
import { IItemsData } from 'src/@core/models/api/invoice/invoice.interface'
import { create } from 'zustand'

export interface IItemContent {
  name: string
  description: string
  cost: number
  hours: number
  price: number
  value: string
}

export interface IStore {
  itemsInvoiceSelectList: IItemsData[]
  itemsInvoiceDeleteList: number[]
  setItemsInvoiceSelectList: (value: IItemsData[]) => void
  addItemsInvoiceDeleteList: (value: number) => void
  deleteItemsInvoiceDeleteList: (value: number) => void
}

export const useItemContentStore = create<IStore>(set => ({
  itemsInvoiceSelectList: [],
  itemsInvoiceDeleteList: [],
  addItemsInvoiceDeleteList: (value: number) =>
    set(
      produce((state: { itemsInvoiceDeleteList: number[] }) => {
        state.itemsInvoiceDeleteList.push(value)
      })
    ),
  deleteItemsInvoiceDeleteList: (value: number) =>
    set(
      produce((state: { itemsInvoiceDeleteList: number[] }) => {
        state.itemsInvoiceDeleteList.filter((item: number) => item !== value)
      })
    ),
  setItemsInvoiceSelectList: (value: any) =>
    set(
      produce((state: { itemsInvoiceSelectList: any }) => {
        state.itemsInvoiceSelectList = value
      })
    )
}))

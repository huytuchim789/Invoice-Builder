import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { searchTabStore } from './table-tab/store'

export const useListInvoiceStore = create(
  devtools(set => ({
    searchTabStore: { ...searchTabStore(set) }
  }))
)

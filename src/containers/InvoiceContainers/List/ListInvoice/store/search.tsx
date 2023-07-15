import { produce } from 'immer'
import { create } from 'zustand'

export interface ISearchTabStore {
  keyword: string | number | string[]
  setKeyword: (value: string | number | string[]) => unknown
  isPaymentMode: boolean
  setIsPaymentMode: (value: boolean) => unknown
}

const useSearchInvoiceStore = create<ISearchTabStore>(set => ({
  keyword: '',
  setKeyword: (value: string | number | string[]) =>
    set(
      produce((state: { keyword: string | number | string[] }) => {
        state.keyword = value
      })
    ),
  isPaymentMode: false,
  setIsPaymentMode(value) {
    set({ isPaymentMode: value })
  }
}))

export default useSearchInvoiceStore

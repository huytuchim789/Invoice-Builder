import { produce } from 'immer'
import { create } from 'zustand'

export interface ISearchTabStore {
  keyword: string | number | string[]
  setKeyword: (value: string | number | string[]) => unknown
}

const useSearchInvoiceStore = create<ISearchTabStore>(set => ({
  keyword: '',
  setKeyword: (value: string | number | string[]) =>
    set(
      produce((state: { keyword: string | number | string[] }) => {
        state.keyword = value
      })
    )
}))

export default useSearchInvoiceStore

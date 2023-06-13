import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { searchParamStore } from './search'

export const useFilterStore = create(
  devtools((set: any) => ({
    searchParamStore: { ...searchParamStore(set) }
  }))
)

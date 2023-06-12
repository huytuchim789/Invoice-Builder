import { produce } from 'immer'

export interface ISearchTabState {
  searchParam: string
  setSearchParam: (value: string) => any
}

export const searchParamStore = (set: any) => ({
  searchParam: '',
  setSearchParam: (value: string) => {
    return set(
      produce((state: { searchParamStore: { searchParam: string } }) => {
        state.searchParamStore.searchParam = value
      })
    )
  }
})

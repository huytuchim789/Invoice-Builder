import { produce } from 'immer'

export interface ISearchTabStore {
  keyword: string
  setKeyword: (value: string) => unknown
}

export const searchTabStore = (set: any) => ({
  keyword: '',
  setKeyword: (value: string) => {
    return set(
      produce((state: { searchTabStore: { keyword: string } }) => {
        state.searchTabStore.keyword = value
      })
    )
  }
})

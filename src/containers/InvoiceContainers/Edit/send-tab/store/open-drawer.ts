import { produce } from 'immer'

export interface IStatusDrawerState {
  status: boolean
  setUser: (value: boolean) => unknown
}

export const statusDrawerStore = (set: any) => ({
  status: false,
  setStatus: (value: boolean) => {
    return set(
      produce((state: { statusDrawerStore: { status: boolean } }) => {
        state.statusDrawerStore.status = value
      })
    )
  }
})

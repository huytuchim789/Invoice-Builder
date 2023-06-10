import { produce } from 'immer'

export interface IRangeDateState {
  rangeDate: string[]
  setRangeDate: (value: string[]) => unknown
}

export const rangeDateStore = (set: any) => ({
  rangeDate: ['', ''],
  setRangeDate: (value: string[]) => {
    return set(
      produce((state: { rangeDateStore: { rangeDate: string[] } }) => {
        state.rangeDateStore.rangeDate = value
      })
    )
  }
})

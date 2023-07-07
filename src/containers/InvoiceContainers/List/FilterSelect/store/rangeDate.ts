import { produce } from 'immer'
import { create } from 'zustand'

export interface IRangeDateState {
  rangeDate: string[]
  setRangeDate: (value: string[]) => void
}

const useRangeDateStore = create<IRangeDateState>(set => ({
  rangeDate: ['', ''],
  setRangeDate: (value: string[]) =>
    set(
      produce((state: { rangeDate: string[] }) => {
        state.rangeDate = value
      })
    )
}))

export default useRangeDateStore

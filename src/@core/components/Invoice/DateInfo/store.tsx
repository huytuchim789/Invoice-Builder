import { produce } from 'immer'
import extendedDayJs from 'src/@core/utils/dayjs'
import { create } from 'zustand'

export interface IDateSelectState {
  date: {
    start: string
    end: string
  }
  setDate: (key: 'start' | 'end', value: string) => unknown
}

const initalDate = {
  start: extendedDayJs().startOf('day').format('YYYY-MM-DD'),
  end: extendedDayJs().endOf('day').format('YYYY-MM-DD')
}

export const useDateInfoStore = create<IDateSelectState>(set => ({
  date: initalDate,
  setDate: (key: 'start' | 'end', value: string) =>
    set(
      produce((state: { date: typeof initalDate }) => {
        state.date[key] = value
      })
    )
}))

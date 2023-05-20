import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { produce } from 'immer'

dayjs.extend(utc)

export interface IDateSelectState {
  date: {
    start: string
    end: string
  }
  setDate: (key: 'start' | 'end', value: string) => unknown
}

const initalDate = {
  start: dayjs().utc().startOf('day').format('YYYY-MM-DD'),
  end: dayjs().utc().endOf('day').format('YYYY-MM-DD')
}

export const dateSelectStore = (set: any) => ({
  date: initalDate,
  setDate: (key: 'start' | 'end', value: string) => {
    return set(
      produce((state: { dateSelectStore: { date: typeof initalDate } }) => {
        state.dateSelectStore.date[key] = value
      })
    )
  }
})

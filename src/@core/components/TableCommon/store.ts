import { produce } from 'immer'
import { create } from 'zustand'

export interface ITableMutilCheckState {
  checkedSelected: string[]
  setCheckedSelected: (value: string, checked: boolean) => void
  setCheckedSelectedAll: (value: string[]) => void
}

export const useTableMutilCheckStore = create<ITableMutilCheckState>(set => ({
  checkedSelected: [],
  setCheckedSelected: (value: string, checked: boolean) =>
    set(
      produce((state: { checkedSelected: string[] }) => {
        if (checked) {
          state.checkedSelected.push(value)
        } else {
          const checkedArr = [...state.checkedSelected]

          state.checkedSelected = checkedArr.filter((checkedSelected: string) => checkedSelected !== value)
        }
      })
    ),
  setCheckedSelectedAll: (value: string[]) =>
    set(
      produce((state: { checkedSelected: string[] }) => {
        state.checkedSelected = value
      })
    )
}))

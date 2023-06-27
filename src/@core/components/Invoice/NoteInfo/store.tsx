import { produce } from 'immer'
import { create } from 'zustand'

export interface INoteTabState {
  note: string
  setNote: (value: string) => unknown
}

export const useNoteInfoStore = create<INoteTabState>(set => ({
  note: '',
  setNote: (value: string) =>
    set(
      produce((state: { note: string }) => {
        state.note = value
      })
    )
}))

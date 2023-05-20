import { produce } from 'immer'

export interface INoteTabState {
  note: string
  setNote: (value: string) => unknown
}

export const noteTabStore = (set: any) => ({
  note: '',
  setNote: (value: string) => {
    return set(
      produce((state: { noteTabStore: { note: string } }) => {
        state.noteTabStore.note = value
      })
    )
  }
})

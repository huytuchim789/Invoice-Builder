import { produce } from 'immer'
import { create } from 'zustand'

export interface ISendingMethod {
  method: string
  setMethod: (value: string) => void
}

export const useSendingMethodStore = create<ISendingMethod>(set => ({
  method: 'web',
  setMethod: (value: string) =>
    set(
      produce((state: { method: string }) => {
        state.method = value
      })
    )
}))

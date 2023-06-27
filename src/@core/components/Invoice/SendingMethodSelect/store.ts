import { produce } from 'immer'
import { create } from 'zustand'

export interface ISendingMethod {
  method: 'web' | 'mail'
  setMethod: (value: 'web' | 'mail') => void
}

export const useSendingMethodStore = create<ISendingMethod>(set => ({
  method: 'web',
  setMethod: (value: 'web' | 'mail') =>
    set(
      produce((state: { method: 'web' | 'mail' }) => {
        state.method = value
      })
    )
}))

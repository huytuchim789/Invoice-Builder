import { produce } from 'immer'

export interface IStatusDrawerState {
  method: 'web' | 'mail'
  setMethod: (value: 'web' | 'mail') => unknown
}

export const paymentMethodStore = (set: any) => ({
  method: 'web',
  setMethod: (value: 'web' | 'mail') => {
    return set(
      produce((state: { paymentMethodStore: { method: 'web' | 'mail' } }) => {
        state.paymentMethodStore.method = value
      })
    )
  }
})

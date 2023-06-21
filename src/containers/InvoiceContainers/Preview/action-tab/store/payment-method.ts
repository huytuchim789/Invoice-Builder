import { produce } from 'immer'

export interface IStatusDrawerState {
  method: 'web' | 'mail'
  setMethod: (value: string) => unknown
}

export const paymentMethodStore = (set: any) => ({
  method: 'web',
  setMethod: (value: string) => {
    return set(
      produce((state: { paymentMethodStore: { method: string } }) => {
        state.paymentMethodStore.method = value
      })
    )
  }
})

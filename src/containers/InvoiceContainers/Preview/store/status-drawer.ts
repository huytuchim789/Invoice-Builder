import { produce } from 'immer'

export interface IStatusDrawerState {
  status: boolean
  setStatus: (value: boolean) => unknown
}

export const statusDrawerSendInvoiceStore = (set: any) => ({
  status: false,
  setStatus: (value: boolean) => {
    return set(
      produce((state: { statusDrawerSendInvoiceStore: { status: boolean } }) => {
        state.statusDrawerSendInvoiceStore.status = value
      })
    )
  }
})

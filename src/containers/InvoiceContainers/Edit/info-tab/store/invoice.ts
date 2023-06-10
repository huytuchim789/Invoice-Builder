import { produce } from 'immer'

export interface IInvoiceIdTabState {
  invoiceId: string
  setInvoiceId: (value: string) => unknown
}

export const invoiceIdStore = (set: any) => ({
  invoiceId: '',
  setInvoiceId: (value: string) => {
    return set(
      produce((state: { invoiceIdStore: { invoiceId: string } }) => {
        state.invoiceIdStore.invoiceId = value
      })
    )
  }
})

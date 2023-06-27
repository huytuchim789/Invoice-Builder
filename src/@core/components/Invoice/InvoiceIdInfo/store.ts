import { produce } from 'immer'
import { create } from 'zustand'

export interface IInvoiceId {
  invoiceId: string
  setInvoiceId: (value: string) => unknown
}

export const useInvoiceIdStore = create<IInvoiceId>(set => ({
  invoiceId: '',
  setInvoiceId: (value: string) =>
    set(
      produce((state: { invoiceId: string }) => {
        state.invoiceId = value
      })
    )
}))

import { produce } from 'immer'
import { create } from 'zustand'

export interface IInvoiceStatusState {
  invoiceStatus: string
  setInvoiceStatus: (value: string) => unknown
}

const useInvoiceStatusStore = create<IInvoiceStatusState>(set => ({
  invoiceStatus: '',
  setInvoiceStatus: (value: string) =>
    set(
      produce((state: { invoiceStatus: string }) => {
        state.invoiceStatus = value
      })
    )
}))

export default useInvoiceStatusStore

import { produce } from 'immer'
import { IInvoiceStatus } from 'src/@core/models/status.interface'

export interface IInvoiceStatusState {
  invoiceStatus: IInvoiceStatus
  setInvoiceStatus: (value: IInvoiceStatus) => unknown
}

export const invoiceStatusStore = (set: any) => ({
  invoiceStatus: '',
  setInvoiceStatus: (value: IInvoiceStatus) => {
    return set(
      produce((state: { invoiceStatusStore: { invoiceStatus: IInvoiceStatus } }) => {
        state.invoiceStatusStore.invoiceStatus = value
      })
    )
  }
})

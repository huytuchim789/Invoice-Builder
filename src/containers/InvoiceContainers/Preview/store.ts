import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { statusDrawerSendInvoiceStore } from './store/status-drawer'
import { paymentMethodStore } from './action-tab/store/payment-method'

export const useInvoicePreviewStore = create(
  devtools((set: any) => ({
    statusDrawerSendInvoiceStore: { ...statusDrawerSendInvoiceStore(set) },
    paymentMethodStore: { ...paymentMethodStore(set) }
  }))
)

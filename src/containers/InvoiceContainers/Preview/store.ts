import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { statusDrawerSendInvoiceStore } from './store/status-drawer'

export const useInvoicePreviewStore = create(
  devtools((set: any) => ({
    statusDrawerSendInvoiceStore: { ...statusDrawerSendInvoiceStore(set) }
  }))
)

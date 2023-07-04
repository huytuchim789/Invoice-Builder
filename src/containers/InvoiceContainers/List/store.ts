import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { searchTabStore } from './ListInvoice/store'
import { invoiceStatusStore } from './FilterSelect/store/status'
import { rangeDateStore } from './FilterSelect/store/range-date'

export const useListInvoiceStore = create(
  devtools((set: any) => ({
    searchTabStore: { ...searchTabStore(set) },
    invoiceStatusStore: { ...invoiceStatusStore(set) },
    rangeDateStore: { ...rangeDateStore(set) }
  }))
)

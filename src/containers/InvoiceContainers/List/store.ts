import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { searchTabStore } from './table-tab/store'
import { invoiceStatusStore } from './filter-tab/store/status'
import { rangeDateStore } from './filter-tab/store/range-date'

export const useListInvoiceStore = create(
  devtools((set: any) => ({
    searchTabStore: { ...searchTabStore(set) },
    invoiceStatusStore: { ...invoiceStatusStore(set) },
    rangeDateStore: { ...rangeDateStore(set) }
  }))
)

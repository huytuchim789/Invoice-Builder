import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { statusDrawerStore, userSelectTabStore } from './send-tab/store'
import { itemContentTabStore } from './item-tab/store'
import { dateSelectStore, invoiceIdStore } from './info-tab/store'
import { noteTabStore } from './note-tab/store'

export const useInvoiceEditStore = create(
  devtools((set: any) => ({
    noteTabStore: { ...noteTabStore(set) },
    dateSelectStore: { ...dateSelectStore(set) },
    itemContentTabStore: { ...itemContentTabStore(set) },
    userSelectTabStore: { ...userSelectTabStore(set) },
    statusDrawerStore: { ...statusDrawerStore(set) },
    invoiceIdStore: { ...invoiceIdStore(set) }
  }))
)

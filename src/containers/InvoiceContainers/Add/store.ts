import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { statusDrawerStore, userSelectTabStore } from './send-tab/store'
import { itemContentTabStore } from './item-tab/store'

export const useInvoiceAddStore = create(
  devtools(set => ({
    itemContentTabStore: { ...itemContentTabStore(set) },
    userSelectTabStore: { ...userSelectTabStore(set) },
    statusDrawerStore: { ...statusDrawerStore(set) }
  }))
)

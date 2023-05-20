import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { statusDrawerStore, userSelectTabStore } from './send-tab/store'
import { itemContentTabStore } from './item-tab/store'
import { dateSelectStore } from './info-tab/store'
import { noteTabStore } from './note-tab/store'

export const useInvoiceAddStore = create(
  devtools(set => ({
    noteTabStore: { ...noteTabStore(set) },
    dateSelectStore: { ...dateSelectStore(set) },
    itemContentTabStore: { ...itemContentTabStore(set) },
    userSelectTabStore: { ...userSelectTabStore(set) },
    statusDrawerStore: { ...statusDrawerStore(set) }
  }))
)

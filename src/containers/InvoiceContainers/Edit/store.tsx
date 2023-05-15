import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import infoTabStore from './info-tab/store'

export const editInvoiceStore = create(
  devtools(set => ({
    infoTabStore: { ...infoTabStore(set) }
  }))
)

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import userStore from '../with-auth/store'

export const globalStore = create(
  devtools(set => ({
    userStore: { ...userStore(set) }
  }))
)

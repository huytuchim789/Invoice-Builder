import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import userStore, { UserState } from '../with-auth/store'

const globalStore = create(
  devtools(set => ({
    userStore: userStore(set)
  }))
)

export default globalStore

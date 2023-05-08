import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import userStore, { UserState } from '../with-auth/store'

const globalStore = create<{ userStore: UserState }, [['zustand/devtools', { userStore: UserState }]]>(
  devtools(set => {
    return {
      userStore: { ...userStore(set) }
    }
  })
)
export default globalStore

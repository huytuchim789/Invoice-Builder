import { produce } from 'immer'
import { User } from 'src/types/custom-types'

export interface UserState {
  user: User
  setUser: (user: User) => unknown
}

const userStore = (set: any) => ({
  user: {},
  setUser: (user: User) => {
    return set(
      produce((state: { userStore: { user: User } }) => {
        state.userStore.user = user
      })
    )
  }
})

export default userStore

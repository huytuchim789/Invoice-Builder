import produce from 'immer'
import { User } from 'src/types/custom-types'

export interface UserState {
  user: User
  setUser: (user: User) => unknown
}

//@ts-ignore

const userStore = set => ({
  user: {},
  setUser: (user: User) => {
    return set(
      //@ts-ignore
      produce<{ userStore: UserState }>(state => {
        state.user = user
      })
    )
  }
})

export default userStore

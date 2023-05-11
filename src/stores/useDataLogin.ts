import { User } from 'src/types/custom-types'
import { create } from 'zustand'

// export interface IDataUserInfo {
//   id: string
//   email: string
//   avatar_url: string
// }

export interface IDataLogin {
  userInfo: User
  updateUserInfo: (state: User) => void
}

const initialValues = {
  id: '',
  email: '',
  username: '',
  avatar_url: ''
}

export const useDataLogin = create<IDataLogin>(set => ({
  userInfo: initialValues,
  updateUserInfo: (state: User) => set({ userInfo: state })
}))

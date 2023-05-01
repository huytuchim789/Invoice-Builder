import { create } from 'zustand'

export interface IDataUserInfo {
  id: string
  email: string
  token: string
}

export interface IDataLogin {
  userInfo: IDataUserInfo
  updateUserInfo: (state: IDataUserInfo) => void
}

const initialValues = {
  id: '',
  email: '',
  token: ''
}

export const useDataLogin = create<IDataLogin>(set => ({
  userInfo: initialValues,
  updateUserInfo: (state: IDataUserInfo) => set({ userInfo: state })
}))

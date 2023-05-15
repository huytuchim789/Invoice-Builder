import { produce } from 'immer'

export interface IAddress {
  road: string
  city: string
  phoneNumber: string
}

export interface UserState {
  address: IAddress
  setAddress: (key: 'road' | 'city' | 'phoneNumber', value: string) => unknown
}

const initialState: IAddress = {
  road: '',
  city: '',
  phoneNumber: ''
}

const infoTabStore = (set: any) => ({
  address: initialState,
  setUser: (key: 'road' | 'city' | 'phoneNumber', value: string) => {
    return set(
      produce((state: { infoTabStore: { address: any } }) => {
        state.infoTabStore.address[key] = value
      })
    )
  }
})

export default infoTabStore

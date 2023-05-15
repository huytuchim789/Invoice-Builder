import { produce } from 'immer'
import { IUserSelectInvoiceTo } from 'src/@core/models/api/invoice.interface'

export interface UserState {
  user: IUserSelectInvoiceTo
  setUser: (value: IUserSelectInvoiceTo) => unknown
}

const initialState: IUserSelectInvoiceTo = {
  name: '',
  address: '',
  company: '',
  contact_number: '',
  country: '',
  email: '',
  id: ''
}

export const userSelectTabStore = (set: any) => ({
  user: initialState,
  setUser: (value: IUserSelectInvoiceTo) => {
    return set(
      produce((state: { userSelectTabStore: { user: IUserSelectInvoiceTo } }) => {
        state.userSelectTabStore.user = value
      })
    )
  }
})

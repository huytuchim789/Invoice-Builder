import { produce } from 'immer'
import { IUserSelectInvoiceTo } from 'src/@core/models/api/invoice/invoice.interface'
import { create } from 'zustand'

export interface IUserSelectState {
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
  id: '',
  created_at: '',
  updated_at: '',
  contact_number_country: ''
}

export const useUserSelectStore = create<IUserSelectState>(set => ({
  user: initialState,
  setUser: (value: IUserSelectInvoiceTo) =>
    set(
      produce((state: { user: IUserSelectInvoiceTo }) => {
        state.user = value
      })
    )
}))

import axiosInstance from 'src/@core/common/axios'

export interface ICustomerUsers {
  name: string
  company: string
  email: string
  country: string
  address: string
  contact_number: string
  contact_number_country: string
}

export const addCustomerUser = (data: ICustomerUsers) => {
  return axiosInstance.post('customers', data)
}

export interface IAddCustomerUserDataError {
  name?: string[]
  company?: string[]
  email?: string[]
  country?: string[]
  address?: string[]
  contact_number?: string[]
  contact_number_country?: string[]
  updated_at?: string[]
  created_at?: string[]
  id: number
}

export interface IAddCustomerUserDataResponseError {
  data: {
    errors: IAddCustomerUserDataError
    message: 'validation.phone (and 1 more error)'
  }
}

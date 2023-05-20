export interface IUserSelectInvoiceTo {
  id: string
  created_at: string
  updated_at: string
  name: string
  company: string
  email: string
  country: string
  address: string
  contact_number: string
  contact_number_country: string
}

export interface IUserSelectInvoiceToDataResponse {
  data: IUserSelectInvoiceTo[]
  message: string
}

export interface IAddUserSelectInvoiceToDataResponse {
  data: IUserSelectInvoiceTo
  message: string
}

export interface IAddCustomerUsersData {
  name: string
  company: string
  email: string
  country: string
  address: string
  contact_number: string
  contact_number_country: string
  updated_at: string
  created_at: string
  id: number
}

export interface IAddCustomerUsersDataResponse {
  data: IAddCustomerUsersData
  message: string
}

export interface IInvoiceDetailData {
  id: string
  issued_date: string
  created_date: string
  note: string
  tax: number
  sale_person: string
  customer_id: string
  total: number
  created_at: string
  updated_at: string
}

export interface IInvoiceDetailDataResponse {
  data: IInvoiceDetailData
  message: string
}

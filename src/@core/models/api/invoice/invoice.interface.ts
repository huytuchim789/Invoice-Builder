import { IItemContent } from 'src/@core/components/Invoice/ItemInfo/store'
import { Organization } from '../organization/organization.interface'

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
  data: {
    current_page: number
    data: IUserSelectInvoiceTo[]
    first_page_url: string
    from: string | null
    next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    last_page: number
    to: string | null
  }
  message: string
}

export interface IItemsDataResponse {
  data: {
    current_page: number
    data: IItemsData[]
    first_page_url: string
    from: string | null
    next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    last_page: number
    to: string | null
  }
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
  id: string
}

export interface IAddCustomerUsersDataResponse {
  data: IAddCustomerUsersData
  message: string
}

export interface IItemsData {
  id: string
  name: string
  price: number
  organization: Organization
  created_at: string | null
  updated_at: string | null
}

export interface IInvoiceDetailData {
  code: string
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
  items: IItemsData[]
  customer: IAddCustomerUsersData
}

export interface IInvoiceDetailLocalData {
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
  items: IItemContent[]
  customer: IUserSelectInvoiceTo
  business?: {
    address?: string
    email?: string
    logo_url?: string
    name?: string
    phone?: string
  }
}

export interface IInvoiceDetailDataResponse {
  data: IInvoiceDetailData
  message: string
}

export interface IInvoiceData {
  current_page: number
  data: IInvoiceDetailData[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: {
    url: string | null
    label: string
    active: boolean
  }[]
  next_page_url: null
  path: string
  per_page: number
  prev_page_url: null
  to: number
  total: number
}

export interface IInvoiceDataResponse {
  data: IInvoiceData
  message: string
}

export interface IItemsInvoiceSelectListDataResponse {
  data: IItemsData[]
  message: string
}

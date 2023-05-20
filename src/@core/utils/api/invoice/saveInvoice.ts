import axiosInstance from 'src/@core/common/axios'

export interface IInvoiceItemInfo {
  name: string
  cost: number
  hours: number
  price: number
  description: string
}

export interface IInvoiceInfo {
  issued_date: string
  created_date: string
  note: string
  tax: number
  sale_person: string
  customer_id: string
  items: IInvoiceItemInfo[]
  total: string
}

export const saveInvoice = (data: IInvoiceInfo) => {
  return axiosInstance.post('invoices', data)
}

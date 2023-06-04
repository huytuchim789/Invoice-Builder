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
  file: Blob
}

export const saveInvoice = (data: IInvoiceInfo) => {
  const formData = new FormData()

  formData.append('issued_date', data.issued_date)
  formData.append('created_date', data.created_date)
  formData.append('note', data.note)
  formData.append('tax', String(data.tax))
  formData.append('customer_id', data.customer_id)
  formData.append('sale_person', data.sale_person)
  formData.append('total', data.total)
  formData.append('file', data.file, 'file.pdf')

  for (let i = 0; i < data.items.length; i++) {
    formData.append(`item[${i}][name]`, data.items[i].name)
    formData.append(`item[${i}][cost]`, String(data.items[i].cost))
    formData.append(`item[${i}][description]`, data.items[i].description)
    formData.append(`item[${i}][hours]`, String(data.items[i].hours))
    formData.append(`item[${i}][price]`, String(data.items[i].price))
  }

  return axiosInstance.post(`invoices`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

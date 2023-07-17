import axiosInstance from 'src/@core/common/axios'
import extendedDayJs from '../../dayjs'

export interface IInvoiceItemInfo {
  value?: string
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
  send_method: 'web' | 'mail'
  subject: string | null
  message: string | null
}

export const saveInvoice = (data: IInvoiceInfo) => {
  const formData = new FormData()

  formData.append('issued_date', extendedDayJs(data.issued_date).format('YYYY-MM-DD'))
  formData.append('created_date', extendedDayJs(data.created_date).format('YYYY-MM-DD'))
  formData.append('note', data.note)
  formData.append('tax', String(data.tax))
  formData.append('customer_id', data.customer_id)
  formData.append('sale_person', data.sale_person)
  formData.append('total', data.total)
  formData.append('file', data.file, 'file.pdf')
  formData.append('send_method', data.send_method)
  formData.append('subject', data.subject ?? '')
  formData.append('message', data.message ?? '')

  for (let i = 0; i < data.items.length; i++) {
    const itemsValue = data.items[i].value

    const cost = JSON.parse(itemsValue ?? '{}').price ?? 0
    const name = JSON.parse(itemsValue ?? '{}').price ?? 0
    const id = JSON.parse(itemsValue ?? '{}').id ?? ''

    formData.append(`items[${i}][id]`, id)
    formData.append(`items[${i}][name]`, name)
    formData.append(`items[${i}][cost]`, String(cost))
    formData.append(`items[${i}][description]`, data.items[i].description)
    formData.append(`items[${i}][hours]`, String(data.items[i].hours))
    formData.append(`items[${i}][price]`, String(data.items[i].hours * cost))
  }

  return axiosInstance.post(`invoices`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

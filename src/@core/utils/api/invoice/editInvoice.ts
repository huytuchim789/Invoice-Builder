import axiosInstance from 'src/@core/common/axios'
import extendedDayJs from '../../dayjs'

export interface IInvoiceItemInfo {
  name: string
  cost: number
  hours: number
  price: number
  description: string
  value: string
  pivot_id?: string
  item_id?: string
  isDeleted: number
}

export interface IInvoiceInfo {
  id: string
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

export const editInvoice = (data: IInvoiceInfo) => {
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
  formData.append('_method', 'PUT')

  for (let i = 0; i < data.items.length; i++) {
    const itemsValue = data.items[i].value

    const cost = JSON.parse(itemsValue ?? '{}').price ?? 0
    const name = JSON.parse(itemsValue ?? '{}').price ?? 0
    const id = JSON.parse(itemsValue ?? '{}').id ?? ''

    if (data.items[i].hasOwnProperty('pivot_id')) {
      formData.append(`items[${i}][id]`, String(data.items[i].pivot_id))
    }

    formData.append(`items[${i}][item_id]`, id)
    formData.append(`items[${i}][name]`, name)
    formData.append(`items[${i}][cost]`, String(cost))
    formData.append(`items[${i}][description]`, data.items[i].description)
    formData.append(`items[${i}][hours]`, String(data.items[i].hours))
    formData.append(`items[${i}][price]`, String(data.items[i].hours * cost))

    if (data.items[i].hasOwnProperty('isDeleted')) {
      formData.append(`items[${i}][is_deleted]`, String(data.items[i].isDeleted))
    } else {
      formData.append(`items[${i}][is_deleted]`, '0')
    }
  }

  return axiosInstance.post(`invoices/${data.id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

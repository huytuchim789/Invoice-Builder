import { IInvoiceDetailData } from '../invoice/invoice.interface'

export interface IEmailTransactionData {
  id: string
  invoice_id: string
  status: string
  error_message: string
  created_at: string
  updated_at: string
  invoice: IInvoiceDetailData
}

export interface IEmailTransationDataResponse {
  data: {
    current_page: number
    data: IEmailTransactionData[]
    first_page_url: string
    from: number
    next_page_url: number | null
    path: string
    per_page: number
    prev_page_url: number | null
    to: number
    code: string
    total: number
    last_page: number
  }
  message: string
}

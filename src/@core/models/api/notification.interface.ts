import { IAuthData } from './auth.interface'
import { IEmailTransactionData } from './email-transaction/index.interface'

export interface INotificationListData {
  created_at: string
  data: {
    email_transaction: IEmailTransactionData
    message: string
    sender: IAuthData
  }
  id: string
  notifiable_id: string
  notifiable_type: string
  read_at: string | null
  type: string
  updated_at: string
}

export interface INotificationListDataResponse {
  current_page: number
  data: INotificationListData[]
  first_page_url: string
  from: number
  next_page_url: number | null
  path: string
  per_page: string
  prev_page_url: number | null
  to: number
}

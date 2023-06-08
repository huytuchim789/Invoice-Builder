import axiosInstance from 'src/@core/common/axios'

export interface ICommentRequest {
  number: number
  invoice_id: string
  message: string
  pin: {
    xRatio: number
    yRatio: number
  }
}
interface IUser {
  id: string
  name: string
  email: string
  avatar_url: string
  email_verified_at: string | null
  created_at: string
  updated_at: string
}

interface IComment {
  id: string
  pin_id: string
  user_id: string
  content: string
  created_at: string
  updated_at: string
  user: IUser
}

export interface IChat {
  id?: string
  number?: number
  coordinate_X: number
  coordinate_Y: number
  invoice_id?: string
  user_id?: string
  created_at?: string
  updated_at?: string
  comments: IComment[]
}

export interface IResponseData {
  data: IChat
  message: string
}

export const addComment = (data: ICommentRequest) => {
  return axiosInstance.post('comments', data)
}

export const getPins = (invoiceId: string) => {
  return axiosInstance.get(`invoices/${invoiceId}/list-pins`)
}

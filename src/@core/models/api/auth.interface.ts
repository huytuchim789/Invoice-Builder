export interface ILoginDataResponse {
  success: boolean
  message: string
  data: ILoginData
}

export interface ILoginData {
  id: string
  email: string
  token: string
}

export interface IAuthData {
  avatar_url: string
  created_at: string
  email: string
  email_verified_at: string | null
  id: string
  name: string
  updated_at: string
}

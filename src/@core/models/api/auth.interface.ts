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

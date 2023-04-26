export interface LoginDataResponse {
  success: boolean;
  message: string;
  data: LoginData;
}

export interface LoginData {
  id: string;
  email: string;
  token: string;
}

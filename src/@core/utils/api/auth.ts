import { ILoginDataResponse } from 'src/@core/models/api/auth.interface'
import { API_BASE_URL } from '.'
import { ParsedUrlQuery } from 'querystring'
import axiosInstance from 'src/@core/common/axios'

export const login = async ({ email, password }: { email: string; password: string }) => {
  try {
    if (!email && email === '') {
      return { success: false, data: null, message: 'Please enter your username' }
    }

    if (!email && password === '') {
      return { success: false, data: null, message: 'Please enter your password' }
    }

    const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    const rawResponse = (await response.json()) as ILoginDataResponse

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    return { success: false, data: null, message: 'Something went wrong' }
  }
}
export const getGoogleUrl = async () => {
  const response = await axiosInstance.get(`auth/google/url`)

  return response?.data
}
export const loginWithGoogle = async (params: ParsedUrlQuery | undefined) => {
  const response = await axiosInstance.get(`auth/google/callback`, { params })

  return response?.data
}

export const getCurrentUser = async () => {
  const response = await axiosInstance.get(`auth/me`)

  return response?.data
}

export const logout = async () => {
  const response = await axiosInstance.post(`auth/logout`)
  return response?.data
}

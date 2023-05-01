import { ILoginDataResponse } from 'src/@core/models/api/auth.interface'
import { API_BASE_URL } from '.'

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

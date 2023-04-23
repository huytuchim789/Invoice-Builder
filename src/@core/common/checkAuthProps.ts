import { USER_INFO } from '../models'

interface Cookies {
  [name: string]: string
}

export const getCheckAuthProps = async (cookiesProps: string) => {
  const cookies: Cookies = {}

  if (cookiesProps) {
    cookiesProps.split(';').forEach((cookie: string) => {
      const parts = cookie.split('=')
      cookies[parts[0].trim()] = decodeURIComponent(parts[1].trim())
    })
  }

  if (!!!cookies[USER_INFO]) {
    return true
  }
}

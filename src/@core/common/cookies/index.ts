import { Buffer } from 'buffer'
import { parse } from 'cookie'
import Cookies from 'js-cookie'

export const COOKIE_KEY = {
  logged_in: 'logged_in',
  redirect_client: 'redirect_client'
}

export const parseCookie = (cookie: string | Record<string, string>): Types.CookieType => {
  if (!cookie) {
    cookie = {}
  } else if (typeof cookie === 'string') {
    cookie = parse(cookie)
  }
  return cookie as Types.CookieType
}

export const setSessionCookie = (session: any) => {
  const csrfToken = session?.csrf_token
  localStorage.setItem('csrfToken', csrfToken)
  const oneDay = 86400
  const expires = (session?.cookie_max_age || oneDay) / oneDay
  Cookies.set(COOKIE_KEY.logged_in, `${true}`, {
    expires
  })
}

export const setMeCookie = (user: Types.User) => {
  // Cookies.set(COOKIE_KEY.has_available_tenant, `${user?.has_available_tenant || false}`)
  // Cookies.set(COOKIE_KEY.has_available_office, `${user?.has_available_office || false}`)
  // Cookies.set(COOKIE_KEY.has_active_office, `${!!result?.office?.id || false}`)
  // setPermisionCookie(result.permissions)
}

export const clearSessionCookie = () => {
  Object.keys(COOKIE_KEY)
    .filter(key => key !== 'NEXT_LOCALE')
    .forEach(key => Cookies.remove(key))
  localStorage.removeItem('csrfToken')
}

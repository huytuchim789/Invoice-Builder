import { parseCookie } from 'src/@core/common/cookies'

export const isPath = (pathname: string) => {
  const relativeWith = (...others: string[]) => others.some(each => isChildPath(pathname, each))
  const isEmpty = () => ['', '/', null, undefined].includes(pathname)
  const isPrivatePath = () => !relativeWith(...publicPath)
  const isClientPath = () => clientPath.includes(pathname)

  return {
    isEmpty,
    relativeWith,
    isPrivatePath,
    isChildPath,
    isClientPath
  }
}
export const isChildPath = (child?: string, parent?: string) => {
  if (!child || !parent) {
    return false
  }
  const s1 = child.split('/')
  const s2 = parent.split('/')

  return s2.every(e => s1.includes(e))
}

export const clientPath = ['pages/sso/auth']

export const publicPath = [...clientPath, 'pages/login', 'pages/404', 'pages/500', 'pages/401']
export const navigateCheck = ({ pathname, cookie }: { pathname: string; cookie: string | any }) => {
  const cookieObject: Types.CookieType = parseCookie(cookie)

  const isLoggedIn = cookieObject.logged_in === 'true'
  // const isHasTenant = cookieObject.has_available_tenant === 'true'
  // const isHasOffice = cookieObject.has_available_office === 'true'
  // const isActiveOffice = cookieObject.has_active_office === 'true'
  const isClientRedirect = !!cookieObject.redirect_client
  // Check middleware for default router '/'
  if ((pathname === '/' || pathname === 'pages/login') && isLoggedIn) {
    pathname = '/'
  } else if (pathname === '/' && !isLoggedIn) {
    pathname = 'pages/login'
  }

  if (!isLoggedIn) {
    if (isPath(pathname).isPrivatePath()) {
      pathname = `pages/login`
    }
    return pathname
  }

  //check middleware for user status

  // if (!isActiveOffice) {
  //   if (isHasOffice) {
  //     return '/offices/switch'
  //   }
  //   if (isHasTenant) {
  //     return '/offices/new'
  //   }
  // }

  // if (!isHasTenant) {

  //   return isPath(pathname).relativeWith('/offices/new') ? pathname : '/login'
  // }

  if (isClientRedirect) {
    pathname = cookieObject?.redirect_client || ''
  }

  return pathname
}

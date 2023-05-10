import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_KEY } from 'src/@core/common/cookies'
import { isPath, navigateCheck } from 'src/@core/security/router-guard'

export async function middleware(req: NextRequest) {
  const pathname = getPagePathName(req)
  const path = isPath(pathname || '')
  const isApi = path.relativeWith('/api')
  if (pathname && !isApi) {
    const cookie = req.cookies
    const redirect = navigateCheck({ pathname, cookie })

    if (pathname !== redirect && !path.isClientPath()) {
      let res = NextResponse.redirect(new URL(redirect, process.env.APP_FE).toString(), 307)
      if (redirect === 'pages/login' && !path.isClientPath() && !path.isEmpty()) {
        res = res.cookie(COOKIE_KEY.redirect_client, pathname)
      }
      console.warn(`>>> do redirect ${pathname} -> ${redirect}`)
      return res
    } else if (pathname === cookie[COOKIE_KEY.redirect_client]) {
      return NextResponse.next().clearCookie(COOKIE_KEY.redirect_client)
    }
  }
  return NextResponse.next()
}

const getPagePathName = ({ url, page }: NextRequest) => {
  try {
    return page?.name ? new URL(url, process.env.APP_FE).pathname : undefined
  } catch (error) {
    console.error('Invalid URL:', process.env.APP_FE, error)
    return undefined
  }
}

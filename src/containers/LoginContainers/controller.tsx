import { NextRouter, useRouter } from 'next/router'
import { useSnackbarWithContext } from 'src/@core/common/snackbar'
import { Store, useLoginStore } from './store'
import { getGoogleUrl, loginWithGoogle } from 'src/@core/utils/api/auth'
import Cookies from 'js-cookie'
import { COOKIE_KEY } from 'src/@core/hocs/with-auth'
import { setSessionCookie } from 'src/@core/common/cookies'

const ctx: Types.ControllerContext<Store> = {}

export function useLoginController() {
  const snackbar = useSnackbarWithContext()

  // ctx.dispatch = useDispatch()
  ctx.store = useLoginStore()
  ctx.router = useRouter()
  const onGetGoogleUrl = async () => {
    ctx.store?.setLoading(true)

    try {
      const { url } = await getGoogleUrl()
      ctx.store?.setGoogleAuthUrl(url)
      ctx.store?.setLoading(false)
    } catch (e) {
      console.error(e)
      snackbar.error('error', { anchorOrigin: { vertical: 'top', horizontal: 'center' } })
    }
  }
  const onLogin = async () => {
    const queryParams = getQueryParams()
    if (!queryParams?.code) {
      snackbar.error('Missing Parameter', { anchorOrigin: { vertical: 'top', horizontal: 'center' } })
    } else {
      try {
        const userInfo = await loginWithGoogle(queryParams)
        setSessionCookie(userInfo)
        snackbar.success('Successfully', { anchorOrigin: { vertical: 'top', horizontal: 'center' } })

        return ctx.router?.replace('/')
      } catch (e) {
        console.log(e)

        snackbar.error('error', { anchorOrigin: { vertical: 'top', horizontal: 'center' } })

        return
      }
    }
    // await ctx.router?.replace('/sign-up')
  }

  return {
    onGetGoogleUrl,
    onLogin
  }
}
function getQueryParams() {
  const queryParams = new URLSearchParams(window.location.search)

  // Convert query params to object
  const queryParamsObj = Object.fromEntries(queryParams.entries())

  return queryParamsObj
}

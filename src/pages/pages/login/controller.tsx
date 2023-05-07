import { NextRouter, useRouter } from 'next/router'
import { useSnackbarWithContext } from 'src/@core/common/snackbar'
import { getAppClientCallback } from 'src/@core/hooks/useGoogleAuth'
import { loginWithGoogle } from 'src/@core/utils/api/auth'

const ctx: { router: NextRouter } = { router: null }

export function useSessionsController() {
  const snackbar = useSnackbarWithContext()

  // ctx.dispatch = useDispatch()
  ctx.router = useRouter()
  const onLogin = async () => {
    const code = new URL(location.href)?.searchParams?.get('code')?.trim() || ''
    if (!code) {
      snackbar.error('Missing Parameter', { anchorOrigin: { vertical: 'top', horizontal: 'center' } })
    } else {
      try {
        await googleAuth(code)
        snackbar.success('Successfully', { anchorOrigin: { vertical: 'top', horizontal: 'center' } })

        return ctx.router.replace('/')
      } catch (e) {
        console.log(e)

        snackbar.error('error', { anchorOrigin: { vertical: 'top', horizontal: 'center' } })

        return
      }
    }
    await ctx.router.replace('/sign-up')
  }

  const googleAuth = async (code: string) => {
    const result = await loginWithGoogle({ code })
    console.log(result)
  }

  return {
    onLogin
  }
}

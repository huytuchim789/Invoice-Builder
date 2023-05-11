import Cookies from 'js-cookie'
import { globalStore } from '../global-store'
import { isPath } from 'src/@core/security/router-guard'
import { getCurrentUser, logout } from 'src/@core/utils/api/auth'
import { useEffect } from 'react'
import { COOKIE_KEY } from 'src/@core/common/cookies'
import { useDataLogin } from 'src/stores/useDataLogin'

// const SpinContainer = dynamic<SpinContainerProps>(
//   () => import('rcs_common/frontend/shared/components/spin-container').then((mod) => mod.SpinContainer),
//   { ssr: false }
// )

export const withAuth = (Component: any) => {
  const WithAuthWrapper = (props: any) => {
    const { user, setUser } = globalStore(state => state.userStore)

    const email = user?.email || ''
    const onGetCurrentUser = async () => {
      try {
        const pathname = location.pathname
        const loggedIn = Cookies.get(COOKIE_KEY.logged_in)
        if (isPath(pathname).isPrivatePath() && !email && loggedIn) {
          const user = await getCurrentUser()
          setUser(user)
        }
      } catch (error) {
        await logout(false)
      }
    }
    useEffect(() => {
      onGetCurrentUser()
    }, [email])
    return Component({ ...props })
  }
  return WithAuthWrapper
}

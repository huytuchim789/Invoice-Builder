import Cookies from 'js-cookie'
import { globalStore } from '../global-store'
import { checkAccessByRole, isPath } from 'src/@core/security/router-guard'
import { getCurrentUser, logout } from 'src/@core/utils/api/auth'
import { useEffect } from 'react'
import { COOKIE_KEY } from 'src/@core/common/cookies'
import { useRouter } from 'next/router'
import { LoadingComponent } from 'src/@core/components/loading'

// const SpinContainer = dynamic<SpinContainerProps>(
//   () => import('rcs_common/frontend/shared/components/spin-container').then((mod) => mod.SpinContainer),
//   { ssr: false }
// )

export const withAuth = (Component: any) => {
  const WithAuthWrapper = (props: any) => {
    const { loading, setLoading } = globalStore(state => state)

    const route = useRouter()
    const { user, setUser } = globalStore(state => state.userStore)
    const email = user?.email || ''
    const onGetCurrentUser = async () => {
      setLoading(true)
      try {
        const pathname = location.pathname
        const loggedIn = Cookies.get(COOKIE_KEY.logged_in)
        if (isPath(pathname).isPrivatePath() && !email && loggedIn) {
          const user = await getCurrentUser()
          setUser(user)
          if (checkAccessByRole(route.pathname) && user?.role === 'guest') {
            return route.push('/401')
          }
        }
      } catch (error) {
        await logout(false)
      }
      setLoading(false)
    }

    useEffect(() => {
      onGetCurrentUser()
    }, [email])

    return Component({ ...props })
  }
  return WithAuthWrapper
}

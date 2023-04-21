import Cookies from 'js-cookie'
import { AUTH_TOKEN_ADMIN } from '../models/common'

export const requireAuthenticated =
  (WrappedComponent: React.FC<React.PropsWithChildren<Record<string, never>>>) => (props: any) => {
    if (typeof window !== 'undefined' && !!!Cookies.get(AUTH_TOKEN_ADMIN)) {
      window.location.href = '/login'
    }

    return <WrappedComponent {...props} />
  }

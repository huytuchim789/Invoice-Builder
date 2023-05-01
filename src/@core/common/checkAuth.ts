import { USER_INFO } from '../models'

interface Cookies {
  [name: string]: string
}

export const getServerSideProps = async (context: { req: { headers: { cookie: string } } }) => {
  const cookies: Cookies = {}
  const { req } = context

  if (req.headers.cookie) {
    req.headers.cookie.split(';').forEach((cookie: string) => {
      const parts = cookie.split('=')
      cookies[parts[0].trim()] = decodeURIComponent(parts[1].trim())
    })
  }

  if (!!!cookies[USER_INFO]) {
    return {
      redirect: {
        destination: '/pages/login',
        permanent: false
      }
    }
  }

  return {
    props: {} // will be passed to the page component as props
  }
}

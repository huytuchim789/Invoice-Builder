import { buildUrl } from '../common'

export const getAppClientCallback = () => `${process.env.APP_FE}/pages/sso/auth`

const DEFAULT_MFID_PARAMS = {
  client_id: process.env.APP_CLIENT_ID,
  redirect_uri: getAppClientCallback(),
  response_type: 'code',
  scope: 'openid email profile',
  access_type: 'offline',
  prompt: 'consent'
}

export const getMfidSelectAccountUrl = (params?: Record<string, any>) => {
  return buildUrl(
    `${process.env.APP_GOOGLE_BASE}`,
    {
      ...DEFAULT_MFID_PARAMS,
      ...params
    },
    false
  )
}

export const getAuthorizeUrl = (params?: Record<string, string>) => {
  return buildUrl(
    `${process.env.APP_GOOGLE_BASE}/oauth/authorize`,
    {
      ...DEFAULT_MFID_PARAMS,
      ...params
    },
    false
  )
}

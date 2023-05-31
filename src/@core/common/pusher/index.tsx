import Pusher from 'pusher-js'

export const pusher = new Pusher('2178207aa7f267c8db9b', {
  cluster: 'ap1',
  authEndpoint: `${process.env.APP_BE}/broadcasting/auth`,
  auth: {
    headers: {
      Authorization: `Bearer ${typeof window !== 'undefined' ? window.localStorage.getItem('csrfToken') : ''}`
    }
  }
})

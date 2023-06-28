import UserInfo from '../components/Invoice/UserInfoSelect/UserInfo'

export const isGuest = (userInfo: any): boolean => {
  return userInfo?.role === 'guest'
}

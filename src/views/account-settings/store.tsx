import { ISubscriptionResponse } from 'src/@core/models/api/payment/subscription.interface'
import create from 'zustand'

export type ISetting = {
  name: string
  email: string
  address: string
  logo?: File
  phone: string
  logo_url?: string
}
export type Store = {
  info: ISetting
  setInfo: (info: ISetting) => void
  loading: boolean
  setLoading: (loading: boolean) => void
  imgSrc: string
  setImgSrc: (imgSrc: string) => void
  checkSub: ISubscriptionResponse
  setCheckSub: (checkSub: ISubscriptionResponse) => void
}

export const useSettingStore = create<Store>(set => ({
  info: {
    name: '',
    email: '',
    address: '',
    logo_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyLm9MqY3S8QTzFZmZffBYbWdLc802a6tUTA&usqp=CAU',
    phone: ''
  },
  setInfo(info) {
    set({ info })
  },
  loading: false,
  setLoading(loading) {
    set({ loading })
  },
  imgSrc: '/images/avatars/1.png',
  setImgSrc(imgSrc) {
    set({ imgSrc })
  },
  checkSub: {
    data: null,
    message: ''
  },
  setCheckSub(checkSub) {
    set({ checkSub })
  }
}))

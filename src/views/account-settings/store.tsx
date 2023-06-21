import create from 'zustand'

type ISetting = {
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
}

export const useSettingStore = create<Store>(set => ({
  info: { name: '', email: '', address: '', logo_url: '', phone: '' },
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
  }
}))

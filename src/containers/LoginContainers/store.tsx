import create from 'zustand'

export type Store = {
  googleAuthUrl: string
  setGoogleAuthUrl: (url: string) => void
  loading: boolean
  setLoading: (loading: boolean) => void
}

export const useLoginStore = create<Store>(set => ({
  googleAuthUrl: '',
  setGoogleAuthUrl(url) {
    set({ googleAuthUrl: url })
  },
  loading: true,
  setLoading: loading => {
    set({ loading })
  }
}))

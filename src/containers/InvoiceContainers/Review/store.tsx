import { IChat } from 'src/@core/utils/api/invoice/review'
import create from 'zustand'

export type Store = {
  chatList: IChat[] | []
  setChatList: (chatList: IChat[]) => void
  activeChatIndex: number
  setActiveChatIndex: (activeChatIndex: number) => void
  fileUrl: string
  setFileUrl: (fileUrl: string) => void
  loading: boolean
  setLoading: (loading: boolean) => void
}

export const useReviewStore = create<Store>(set => ({
  chatList: [],
  setChatList(chatList) {
    set({ chatList })
  },
  activeChatIndex: -1,
  setActiveChatIndex(activeChatIndex) {
    set({ activeChatIndex })
  },
  fileUrl: '',
  setFileUrl(fileUrl) {
    set({ fileUrl })
  },
  loading: false,
  setLoading(loading) {
    set({ loading })
  }
}))

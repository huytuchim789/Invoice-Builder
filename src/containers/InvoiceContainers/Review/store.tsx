import { IChat } from 'src/@core/utils/api/invoice/review'
import create from 'zustand'

export type Store = {
  chatList: IChat[] | []
  setChatList: (chatList: IChat[]) => void
  activeChatIndex: number
  setActiveChatIndex: (activeChatIndex: number) => void
}

export const useReviewStore = create<Store>(set => ({
  chatList: [],
  setChatList(chatList) {
    set({ chatList })
  },
  activeChatIndex: -1,
  setActiveChatIndex(activeChatIndex) {
    set({ activeChatIndex })
  }
}))

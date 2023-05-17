import { produce } from 'immer'

export interface IItemContent {
  content: string
  description: string
  cost: number
  hour: number
}

export interface IItemState {
  itemContent: IItemContent[]
  setItemContent: (value: IItemContent) => unknown
}

const initialState: IItemContent[] = [
  {
    content: '',
    description: '',
    cost: 0,
    hour: 0
  }
]

export const itemContentTabStore = (set: any) => ({
  itemContent: initialState,
  addItemContent: () =>
    set(
      produce((state: { itemContentTabStore: { itemContent: IItemContent[] } }) => {
        state.itemContentTabStore.itemContent.push({
          content: '',
          description: '',
          cost: 0,
          hour: 0
        })
      })
    ),
  setItemContent: (value: IItemContent, key: string, index: number) => {
    return set(
      produce((state: { itemContentTabStore: { itemContent: IItemContent[] } }) => {
        state.itemContentTabStore.itemContent[index] = {
          ...state.itemContentTabStore.itemContent[index],
          [key]: value
        }
      })
    )
  },
  deleteItemContent: (index: number) => {
    return set(
      produce((state: { itemContentTabStore: { itemContent: IItemContent[] } }) => {
        state.itemContentTabStore.itemContent.splice(index, 1)
      })
    )
  }
})

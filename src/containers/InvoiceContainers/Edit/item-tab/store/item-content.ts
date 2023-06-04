import { produce } from 'immer'

export interface IItemContent {
  name: string
  description: string
  cost: number
  hours: number
  price: number
}

export interface IItemState {
  itemContent: IItemContent[]
  setItemContent: (value: IItemContent) => unknown
}

const initialState: IItemContent[] = [
  {
    name: '',
    description: '',
    cost: 0,
    hours: 0,
    price: 0
  }
]

export const itemContentTabStore = (set: any) => ({
  itemContent: initialState,
  subTotal: 0,
  addItemContent: () =>
    set(
      produce((state: { itemContentTabStore: { itemContent: IItemContent[] } }) => {
        state.itemContentTabStore.itemContent.push({
          name: '',
          description: '',
          cost: 0,
          hours: 0,
          price: 0
        })
      })
    ),
  setItemContent: (value: string & number, key: string, index: number) => {
    return set(
      produce((state: { itemContentTabStore: { itemContent: IItemContent[]; subTotal: number } }) => {
        const itemContentArr: IItemContent[] = state.itemContentTabStore.itemContent

        const costValue = key === 'cost' ? value : itemContentArr[index].cost
        const hourValue = key === 'hours' ? value : itemContentArr[index].hours

        itemContentArr[index] = {
          ...itemContentArr[index],
          [key]: value,
          ['price']: costValue * hourValue
        }

        state.itemContentTabStore.subTotal = itemContentArr.reduce(
          (accumulateValue: number, nextValue: IItemContent) => accumulateValue + nextValue.price,
          0
        )

        state.itemContentTabStore.itemContent = itemContentArr
      })
    )
  },
  deleteItemContent: (index: number) => {
    return set(
      produce((state: { itemContentTabStore: { itemContent: IItemContent[]; subTotal: number } }) => {
        const itemContentArr: IItemContent[] = state.itemContentTabStore.itemContent

        itemContentArr.splice(index, 1)

        state.itemContentTabStore.subTotal = itemContentArr.reduce(
          (accumulateValue: number, nextValue: IItemContent) => accumulateValue + nextValue.price,
          0
        )

        state.itemContentTabStore.itemContent = itemContentArr
      })
    )
  }
})

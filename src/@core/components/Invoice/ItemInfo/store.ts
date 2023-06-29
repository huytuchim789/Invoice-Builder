import { produce } from 'immer'
import { create } from 'zustand'

export interface IItemContent {
  name: string
  description: string
  cost: number
  hours: number
  price: number
}

export interface IStore {
  itemContent: IItemContent[]
  subTotal: number
  addItemContent: () => void
  setItemContent: (value: string | number, key: string, index: number) => void
  deleteItemContent: (index: number) => void
  setAllItemContent: (value: IItemContent[]) => void
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

export const useItemContentStore = create<IStore>(set => ({
  itemContent: initialState,
  subTotal: 0,
  addItemContent: () =>
    set(
      produce((state: { itemContent: IItemContent[] }) => {
        state.itemContent.push({
          name: '',
          description: '',
          cost: 0,
          hours: 0,
          price: 0
        })
      })
    ),
  setItemContent: (value: string | number, key: string, index: number) =>
    set(
      produce((state: { itemContent: IItemContent[]; subTotal: number }) => {
        const itemContentArr: IItemContent[] = state.itemContent

        const costValue = key === 'cost' ? value : itemContentArr[index].cost
        const hourValue = key === 'hours' ? value : itemContentArr[index].hours

        itemContentArr[index] = {
          ...itemContentArr[index],
          [key]: value,
          ['price']: Number(costValue) * Number(hourValue)
        }

        state.subTotal = itemContentArr.reduce(
          (accumulateValue: number, nextValue: IItemContent) => accumulateValue + nextValue.price,
          0
        )

        state.itemContent = itemContentArr
      })
    ),
  deleteItemContent: (index: number) =>
    set(
      produce((state: { itemContent: IItemContent[]; subTotal: number }) => {
        const itemContentArr: IItemContent[] = state.itemContent

        itemContentArr.splice(index, 1)

        state.subTotal = itemContentArr.reduce(
          (accumulateValue: number, nextValue: IItemContent) => accumulateValue + nextValue.price,
          0
        )

        state.itemContent = itemContentArr
      })
    ),
  setAllItemContent: (value: IItemContent[]) =>
    set(
      produce((state: { itemContent: IItemContent[]; subTotal: number }) => {
        state.itemContent = value

        state.subTotal = value.reduce(
          (accumulateValue: number, nextValue: IItemContent) => accumulateValue + nextValue.price,
          0
        )
      })
    )
}))

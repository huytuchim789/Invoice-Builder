import axiosInstance from 'src/@core/common/axios'

export interface IAddItem {
  name: string
  price: number
}

export const addItem = (data: IAddItem) => {
  return axiosInstance.post('items', data)
}

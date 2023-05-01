export interface INewsListDataResponse {
  success: boolean
  data: INewsListData[]
  pagination: {
    startPage: number
    limit: number
    totalPages: number
    totalRecords: number
  }
}

export interface INewsListData {
  id: string
  title: string
  image: string
  view: number
  content: string
  day: number
}

export interface ICreateNewsResponse {
  success: boolean
  data: null
  message: string
}

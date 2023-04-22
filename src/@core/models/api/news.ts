export interface NewsListDataResponse {
  success: boolean
  data: NewsListData[]
  pagination: {
    startPage: number
    limit: number
    totalPages: number
    totalRecords: number
  }
}

export interface NewsListData {
  id: string
  title: string
  image: string
  view: number
  content: string
  day: number
}

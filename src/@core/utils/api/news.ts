import { NewsListDataResponse } from 'src/@core/models/api/news'
import { API_BASE_URL } from '.'

export const getNewsList = async (input: {
  limit: number
  page: number
  keyword: string
  startTime: number
  endTime: number
}) => {
  try {
    const limit = input.limit ?? 10
    const page = input.page ?? 1
    const keyword = input.keyword ?? ''

    const response = await fetch(
      `${API_BASE_URL}/api/news?limit=${limit}&keyword=${keyword}&page=${page}&startDate=${input.startTime}&endDate=${input.endTime}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    const rawResponse = (await response.json()) as NewsListDataResponse

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    return { success: false, data: null, message: 'Something went wrong' }
  }
}

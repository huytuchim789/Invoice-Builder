import { ICreateNewsResponse, INewsListDataResponse } from 'src/@core/models/api/news.interface'
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
        method: 'GET'
      }
    )

    const rawResponse = (await response.json()) as INewsListDataResponse

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    return { success: false, data: null, message: 'Something went wrong' }
  }
}

export const createNews = async (input: {
  title: string
  type: string
  image: string | ArrayBuffer | null
  description: string
  content: string
  device: string
  accessToken: string
}) => {
  try {
    const { title, type, image, description, content, device, accessToken } = input

    if (!title || title === '') {
      return { success: false, data: null, message: 'Invalid Title Input' }
    }

    if (!image) {
      return { success: false, data: null, message: 'Invalid Image Input' }
    }

    if (!content || content === '') {
      return { success: false, data: null, message: 'Invalid Content Input' }
    }

    if (!description || description === '') {
      return { success: false, data: null, message: 'Invalid Description Input' }
    }

    if (!type || type === '') {
      return { success: false, data: null, message: 'Invalid Title Input' }
    }

    if (!device || device === '') {
      return { success: false, data: null, message: 'Invalid Device Input' }
    }

    if (!accessToken || accessToken === '') {
      return { success: false, data: null, message: 'Invalid Token' }
    }

    const response = await fetch(`${API_BASE_URL}/api/news/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({ title, type, image, description, content, device })
    })

    const rawResponse = (await response.json()) as ICreateNewsResponse

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    return { success: false, data: null, message: 'Something went wrong' }
  }
}

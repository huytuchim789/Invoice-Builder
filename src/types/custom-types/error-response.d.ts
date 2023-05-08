import { AxiosError } from 'axios'

export type Error = {
  errors: {
    source: any
    code: string
    detail: string
    status: number
  }[]
}

export type RequestError = AxiosError<Error>

export const AUTH_TOKEN_ADMIN = 'admin_english_token'

export interface NewsList {
  id: number
  name: string
  value: string
}

export interface IIconsTypes {
  width: number
  height: number
  color?: string
}

export enum AlertColorEnum {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning'
}

export enum NEWS {
  SPORT = 'sport',
  BUSINESS = 'business',
  EDUCATION = 'education',
  ENTERTAINMENT = 'entertainment',
  TECHNOLOGY = 'technology',
  MUSIC = 'music',
  TRAVEL = 'travel'
}

export const NEWS_LIST: NewsList[] = [
  {
    id: 1,
    name: 'Sport',
    value: NEWS.SPORT
  },
  {
    id: 2,
    name: 'Business',
    value: NEWS.BUSINESS
  },
  {
    id: 3,
    name: 'Education',
    value: NEWS.EDUCATION
  },
  {
    id: 4,
    name: 'Entertainment',
    value: NEWS.ENTERTAINMENT
  },
  {
    id: 5,
    name: 'Music',
    value: NEWS.MUSIC
  },
  {
    id: 6,
    name: 'Technology',
    value: NEWS.TECHNOLOGY
  },
  {
    id: 7,
    name: 'Travel',
    value: NEWS.TRAVEL
  }
]

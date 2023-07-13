export interface ISubscriptionResponse {
  data: ISupscriptionData | null
  message: any
}

export interface ISupscriptionData {
  id: number
  user_id: string
  name: string
  stripe_id: string
  stripe_status: string
  stripe_price: string
  quantity: number
  trial_ends_at: string
  ends_at: any
  created_at: string
  updated_at: string
  items: ISupscriptionItem[]
}

export interface ISupscriptionItem {
  id: number
  subscription_id: number
  stripe_id: string
  stripe_product: string
  stripe_price: string
  quantity: number
  created_at: string
  updated_at: string
}

import axiosInstance from 'src/@core/common/axios'
import { ICardInfo, ICardProps } from 'src/@core/models/api/payment/card.interface'

export const addPayment = async (payment: ICardProps) => {
  const { data } = (await axiosInstance.post('billing/create-payment-method', payment)) as { data: ICardInfo }

  return data
}

export const getCard = async () => {
  const { data } = (await axiosInstance.get('billing/check-card')) as { data: ICardInfo }

  return data.data
}

export const detachCard = async () => {
  const { data } = (await axiosInstance.post('billing/detach-payment')) as { data: { message: string } }

  return data
}

export const subcribeProPlan = async () => {
  const { data } = (await axiosInstance.post('billing/subscribe')) as { data: { message: string } }

  return data
}

export const unSubcribeProPlan = async () => {
  const { data } = (await axiosInstance.post('billing/cancel-subscription')) as { data: { message: string } }

  return data
}

import axiosInstance from 'src/@core/common/axios'

type IPayment = {
  type: string
  details: {
    number: string
    exp_month: number
    exp_year: number
    cvc: string
  }
}

export const addPayment = (data: IPayment) => {
  return axiosInstance.post('billing/create-payment-method', data)
}

export const getCard = () => {
  return axiosInstance.get('billing/check-subscription')
}

import axiosInstance from 'src/@core/common/axios'

export const sendInvoiceByMail = (data: any, page: number) => {
  return axiosInstance.post(`send-email?page=${page}`, data)
}

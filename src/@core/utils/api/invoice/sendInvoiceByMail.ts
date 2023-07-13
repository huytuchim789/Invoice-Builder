import axiosInstance from 'src/@core/common/axios'

export const sendInvoiceByMail = (data: any) => {
  return axiosInstance.post(`send-email`, data)
}

export const sendMultipleInvoiceByMail = (data: any) => {
  return axiosInstance.post(`send-multiple-email`, data)
}

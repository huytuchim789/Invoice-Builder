import axiosInstance from 'src/@core/common/axios'

export const markAsPaid = (invoiceId: string) => {
  return axiosInstance.put(`invoices/${invoiceId}/mark-as-paid`)
}

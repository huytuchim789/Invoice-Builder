import axiosInstance from 'src/@core/common/axios'

export const deleteInvoice = (email_transaction_id: string) => {
  return axiosInstance.delete(`email-transactions/${email_transaction_id}`)
}

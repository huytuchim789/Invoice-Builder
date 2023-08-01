import axiosInstance from 'src/@core/common/axios'

export const downloadInvoices = async (emailTransactionIds: string[]) => {
  return axiosInstance.post(
    '/invoices/download',
    { email_transaction_ids: emailTransactionIds },
    { responseType: 'blob' }
  )
}

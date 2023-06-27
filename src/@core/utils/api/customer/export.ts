import axiosInstance from 'src/@core/common/axios'

export const exportCustomer = async () => {
  return axiosInstance.get('customers/export', {
    responseType: 'blob'
  })
}

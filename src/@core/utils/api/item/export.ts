import axiosInstance from 'src/@core/common/axios'

export const exportItem = async () => {
  return axiosInstance.get('items/export', {
    responseType: 'blob'
  })
}

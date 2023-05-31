import axiosInstance from 'src/@core/common/axios'

export const markAllNotiRead = () => {
  return axiosInstance.put(`notifications/mark-all-as-read`)
}

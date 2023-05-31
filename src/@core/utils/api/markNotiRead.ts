import axiosInstance from 'src/@core/common/axios'

export const markNotiRead = (id: string) => {
  return axiosInstance.put(`notifications/${id}/mark-as-read`)
}

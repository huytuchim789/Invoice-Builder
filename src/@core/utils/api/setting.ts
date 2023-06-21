import axiosInstance from 'src/@core/common/axios'

export const onChangeSettings = (data: any) => {
  return axiosInstance.post(`organizations`, data)
}

export const onGetgetSettings = () => {
  return axiosInstance.get(`organizations/get-settings`)
}

import axiosInstance from 'src/@core/common/axios'

export const validateItemFile = (formData: any) => {
  return axiosInstance.post('items/validate-csv', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

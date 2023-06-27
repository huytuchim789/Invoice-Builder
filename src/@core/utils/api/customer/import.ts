import axiosInstance from 'src/@core/common/axios'

export const importCustomer = (formData: any) => {
  return axiosInstance.post('customers/import', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

import axiosInstance from 'src/@core/common/axios'

export const validateCustomerFile = (formData: any) => {
  return axiosInstance.post('customers/validate-csv', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

import axiosInstance from 'src/@core/common/axios'

export const importCustomer = (formData: any) => {
  const data = axiosInstance.post('customers/import', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }) as any

  return data
}

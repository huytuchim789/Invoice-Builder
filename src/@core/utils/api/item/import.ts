import axiosInstance from 'src/@core/common/axios'

export const importItem = (formData: any) => {
  const data = axiosInstance.post('items/import', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }) as any

  return data
}

export const getErrorMessages = error => {
  if (error?.response?.data?.errors?.[0]) {
    return error?.response?.data?.errors?.[0]?.detail
  }
}

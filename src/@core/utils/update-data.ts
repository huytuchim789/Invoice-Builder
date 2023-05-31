export const updateData = (arr: any[], id: string, updatedData: any) => {
  return arr.map(item => (item.id === id ? { ...item, ...updatedData } : item))
}

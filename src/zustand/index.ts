import { create } from 'zustand'
import { DataOpenAlert } from 'src/@core/models/zustand'
import { AlertColor } from '@mui/material'

export const useOpenHeaderStore = create<DataOpenAlert>(set => ({
  isOpenAlert: {
    message: '',
    severity: 'success',
    open: false
  },
  setIsOpenAlert: (info: { message: string; severity: AlertColor; open: boolean }) => set({ isOpenAlert: info })
}))

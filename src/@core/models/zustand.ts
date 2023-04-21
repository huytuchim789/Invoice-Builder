import { AlertColor } from '@mui/material'

export interface DataOpenAlert {
  isOpenAlert: {
    message: string
    severity: AlertColor
    open: boolean
  }
  setIsOpenAlert: (state: { message: string; severity: AlertColor; open: boolean }) => void
}

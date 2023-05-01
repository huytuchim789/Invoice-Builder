import { create } from 'zustand'
import { AlertColor } from '@mui/material'

export interface IStatusAlert {
  message: string
  severity: AlertColor
  open: boolean
}

export interface IDataOpenAlert {
  statusAlert: IStatusAlert
  update: (state: IStatusAlert) => void
}

const initialValues: IStatusAlert = {
  message: '',
  severity: 'success',
  open: false
}

const updateStatusAlert =
  (set: {
    (
      partial:
        | IDataOpenAlert
        | Partial<IDataOpenAlert>
        | ((state: IDataOpenAlert) => IDataOpenAlert | Partial<IDataOpenAlert>),
      replace?: boolean | undefined
    ): void
    (arg0: () => { statusAlert: IStatusAlert }): any
  }) =>
  (updatedInfo: IStatusAlert) =>
    set(() => {
      return { statusAlert: updatedInfo }
    })

export const useStatusAlert = create<IDataOpenAlert>(set => ({
  statusAlert: initialValues,
  update: updateStatusAlert(set)
}))

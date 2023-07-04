import { produce } from 'immer'
import { create } from 'zustand'

export interface ISettingPdfState {
  settingPdf: {
    format: string
    font: string
  }
  setSettingPdf: (value: { format: string; font: string }) => void
}

export const useSettingPdfStore = create<ISettingPdfState>(set => ({
  settingPdf: {
    format: 'bold',
    font: 'AlegreyaSans'
  },
  setSettingPdf: (value: { format: string; font: string }) =>
    set(
      produce(
        (state: {
          settingPdf: {
            format: string
            font: string
          }
        }) => {
          state.settingPdf = value
        }
      )
    )
}))

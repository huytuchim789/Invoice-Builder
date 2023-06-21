import { useRouter } from 'next/router'
import { useSnackbarWithContext } from 'src/@core/common/snackbar'
import { Store, useSettingStore } from './store'
import { onChangeSettings, onGetgetSettings } from 'src/@core/utils/api/setting'

const ctx: Types.ControllerContext<Store> = {}

export function useSettingController() {
  const snackbar = useSnackbarWithContext()
  ctx.store = useSettingStore()
  // ctx.dispatch = useDispatch()
  ctx.router = useRouter()

  const changSettings = async data => {
    try {
      const response = await onChangeSettings(data)
      console.log(response)
    } catch (error) {
      console.error(error)
      snackbar.error(error.message)
    }
  }
  const getSettings = async () => {
    try {
      const response = await onGetgetSettings()
      ctx.store?.setInfo(response?.data?.data)
      ctx.store?.setImgSrc(response?.data?.data?.logo_url || '/images/avatars/1.png')
    } catch (error) {}
  }
  return {
    changSettings,
    getSettings
  }
}

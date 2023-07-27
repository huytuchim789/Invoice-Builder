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

  const changSettings = async (data: any) => {
    ctx.store?.setLoading(true)
    try {
      const response = await onChangeSettings(data)
      ctx.store?.setLoading(false)
      snackbar.success(response?.data?.message)
      ctx.store?.setLoading(false)
    } catch (error) {
      ctx.store?.setLoading(false)

      console.error(error)
      snackbar.error('error')
    }
  }
  const getSettings = async () => {
    ctx.store?.setLoading(true)

    try {
      const response = await onGetgetSettings()
      ctx.store?.setInfo(response?.data?.data)
      response?.data?.data?.logo_url && ctx.store?.setImgSrc(response?.data?.data?.logo_url)
      ctx.store?.setLoading(false)
      snackbar.success(response?.data?.message)
    } catch (error) {
      console.error(error)
      ctx.store?.setLoading(false)
      snackbar.error('error')
    }
  }
  return {
    changSettings,
    getSettings
  }
}

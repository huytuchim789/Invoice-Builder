import { useRouter } from 'next/router'
import { useSnackbarWithContext } from 'src/@core/common/snackbar'
import { Store, useReviewStore } from './store'
import { ICommentRequest, addComment, getPins } from 'src/@core/utils/api/invoice/review'

const ctx: Types.ControllerContext<Store> = {}

export function useReviewController() {
  const snackbar = useSnackbarWithContext()
  ctx.store = useReviewStore()
  // ctx.dispatch = useDispatch()
  ctx.router = useRouter()

  const onAddComment = async (data: ICommentRequest) => {
    ctx?.store?.setLoadingBtn(true)

    try {
      const res = await addComment(data)
      ctx.store?.setChatList(res?.data?.data)
      ctx?.store?.setLoadingBtn(false)

      snackbar.success('Successfully', { anchorOrigin: { vertical: 'top', horizontal: 'center' } })
    } catch (error) {
      snackbar.error('Error', { anchorOrigin: { vertical: 'top', horizontal: 'center' } })
      ctx?.store?.setLoadingBtn(false)

      console.error(error)
    }
  }

  const getListPins = async (invoiceId: string) => {
    ctx.store?.setLoading(true)
    try {
      const res = await getPins(invoiceId)
      ctx.store?.setChatList(res?.data?.data?.pins)
      ctx.store?.setFileUrl(res?.data?.data?.file_url)
      ctx.store?.setLoading(false)
    } catch (error) {
      ctx.store?.setLoading(false)
      snackbar.error('Error', { anchorOrigin: { vertical: 'top', horizontal: 'center' } })

      console.error(error)
    }
  }
  return { onAddComment, getListPins }
}

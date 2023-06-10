import { useRouter } from 'next/router'
import { useSnackbarWithContext } from 'src/@core/common/snackbar'
import { Store, useReviewStore } from './store'
import { ICommentRequest, addComment, getPins } from 'src/@core/utils/api/invoice/review'
import { useForm } from 'react-hook-form'

const ctx: Types.ControllerContext<Store> = {}

export function useReviewController() {
  const snackbar = useSnackbarWithContext()
  ctx.store = useReviewStore()
  // ctx.dispatch = useDispatch()
  ctx.router = useRouter()

  const onAddComment = async (data: ICommentRequest) => {
    try {
      const res = await addComment(data)
      ctx.store?.setChatList(res?.data?.data)
      snackbar.success('Successfully', { anchorOrigin: { vertical: 'top', horizontal: 'center' } })
    } catch (error) {
      console.log(error)
    }
  }

  const getListPins = async (invoiceId: string) => {
    try {
      const res = await getPins(invoiceId)
      ctx.store?.setChatList(res?.data?.data)
      snackbar.success('Successfully', { anchorOrigin: { vertical: 'top', horizontal: 'center' } })
    } catch (error) {
      console.log(error)
    }
  }
  return { onAddComment, getListPins }
}

import { Button } from '@mui/material'
import { useInvoiceAddStore } from '../store'
import { IInvoiceInfo, saveInvoice } from 'src/@core/utils/api/invoice/saveInvoice'
import { globalStore } from 'src/@core/hocs/global-store'
import { useMutation } from '@tanstack/react-query'
import { useSnackbarWithContext } from 'src/@core/common/snackbar'
import { useRouter } from 'next/router'

export const SaveButton = () => {
  const router = useRouter()
  const snackbar = useSnackbarWithContext()

  const [userSelect, items, dateSelect, noteSelect] = useInvoiceAddStore((state: any) => [
    state.userSelectTabStore,
    state.itemContentTabStore,
    state.dateSelectStore,
    state.noteTabStore
  ])
  const { user } = globalStore((state: any) => state.userStore)

  const { mutate, isLoading: isSaveInvoiceLoading } = useMutation({
    mutationFn: async (data: IInvoiceInfo) => await saveInvoice(data),
    onSuccess: ({ data }: { data: { message: string } }) => {
      router.push('/invoice/list')

      snackbar.success(data.message)
    },
    onError: (err: { response: any }) => {
      const { response } = err

      snackbar.error(response.data.message)
    }
  })

  const handleSendInvoice = () => {
    const data: IInvoiceInfo = {
      issued_date: dateSelect.date.end,
      created_date: dateSelect.date.start,
      note: noteSelect.note,
      tax: 21,
      sale_person: user?.name,
      customer_id: userSelect.user.id,
      items: items.itemContent,
      total: items.subTotal + (items.subTotal * 21) / 100
    }

    mutate(data)
  }

  return (
    <Button type='button' fullWidth variant='outlined' onClick={handleSendInvoice} disabled={isSaveInvoiceLoading}>
      Save
    </Button>
  )
}

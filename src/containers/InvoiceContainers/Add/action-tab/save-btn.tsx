import { Button } from '@mui/material'
import { useInvoiceAddStore } from '../store'
import { IInvoiceInfo, saveInvoice } from 'src/@core/utils/api/invoice/saveInvoice'
import { globalStore } from 'src/@core/hocs/global-store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSnackbarWithContext } from 'src/@core/common/snackbar'
import { useRouter } from 'next/router'
import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'
import InvoicePDF from '../../InvoicePDF'
import { usePDF } from '@react-pdf/renderer'

export const SaveButton = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const snackbar = useSnackbarWithContext()

  const [userSelect, items, dateSelect, noteSelect] = useInvoiceAddStore((state: any) => [
    state.userSelectTabStore,
    state.itemContentTabStore,
    state.dateSelectStore,
    state.noteTabStore
  ])

  const { user } = globalStore((state: any) => state.userStore)

  const MyDoc = (
    <InvoicePDF
      invoice_detail={{
        id: '',
        updated_at: dateSelect.date.end,
        created_at: dateSelect.date.start,
        issued_date: dateSelect.date.end,
        created_date: dateSelect.date.start,
        note: noteSelect.note,
        tax: 21,
        sale_person: user?.name,
        customer_id: userSelect.user.id,
        items: items.itemContent,
        total: items.subTotal + (items.subTotal * 21) / 100,
        customer: userSelect.user
      }}
    />
  )

  const [instance] = usePDF({ document: MyDoc })

  const { mutate, isLoading: isSaveInvoiceLoading } = useMutation({
    mutationFn: async (data: IInvoiceInfo) => await saveInvoice(data),
    onSuccess: ({ data }: { data: { message: string } }) => {
      queryClient.invalidateQueries([QUERY_INVOICE_KEYS.EMAIL_TRANSACTION])
      router.push('/invoice/list')

      snackbar.success(data.message)
    },
    onError: (err: { response: any }) => {
      const { response } = err

      snackbar.error(response.data.message)
    }
  })

  const handleSendInvoice = () => {
    if (instance.blob !== null) {
      const data: IInvoiceInfo = {
        issued_date: dateSelect.date.end,
        created_date: dateSelect.date.start,
        note: noteSelect.note,
        tax: 21,
        sale_person: user?.name,
        customer_id: userSelect.user.id,
        items: items.itemContent,
        total: items.subTotal + (items.subTotal * 21) / 100,
        file: instance.blob
      }

      mutate(data)
    } else {
      snackbar.error('What the fuck')
    }
  }

  return (
    <Button type='button' fullWidth variant='outlined' onClick={handleSendInvoice} disabled={isSaveInvoiceLoading}>
      Save
    </Button>
  )
}

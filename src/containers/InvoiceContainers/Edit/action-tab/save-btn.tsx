import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { usePDF } from '@react-pdf/renderer'

import { Button } from '@mui/material'

import { useInvoiceEditStore } from '../store'
import { IInvoiceInfo, editInvoice } from 'src/@core/utils/api/invoice/editInvoice'
import { useSnackbarWithContext } from 'src/@core/common/snackbar'
import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'
import InvoicePDF from '../../InvoicePDF'
import { globalStore } from 'src/@core/hocs/global-store'

export const SaveButton = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const snackbar = useSnackbarWithContext()

  const { user } = globalStore((state: any) => state.userStore)

  const [userSelect, items, dateSelect, noteSelect, invoice] = useInvoiceEditStore((state: any) => [
    state.userSelectTabStore,
    state.itemContentTabStore,
    state.dateSelectStore,
    state.noteTabStore,
    state.invoiceIdStore
  ])

  const MyDoc = useMemo(() => {
    if (userSelect.user.id !== '') {
      return (
        <InvoicePDF
          invoice_detail={{
            id: invoice.invoiceId,
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
    }
  }, [user, userSelect, items, dateSelect, noteSelect])

  const [instance, updateInstance] = usePDF({ document: MyDoc || <></> })

  useEffect(() => {
    if (MyDoc) {
      updateInstance()
    }
  }, [user, userSelect, items, dateSelect, noteSelect])

  const { mutate, isLoading: isEditInvoiceLoading } = useMutation({
    mutationFn: async (data: IInvoiceInfo) => await editInvoice(data),
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

  const handleEditInvoice = () => {
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
    <Button fullWidth variant='outlined' onClick={handleEditInvoice} disabled={isEditInvoiceLoading}>
      Edit
    </Button>
  )
}

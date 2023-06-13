import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { usePDF } from '@react-pdf/renderer'

import { Button } from '@mui/material'

import { IInvoiceInfo, editInvoice } from 'src/@core/utils/api/invoice/editInvoice'
import { useSnackbarWithContext } from 'src/@core/common/snackbar'
import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'
import InvoicePDF from '../../InvoicePDF'
import { useInvoiceEditStoreData } from './component/data'

export const SaveButton = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const snackbar = useSnackbarWithContext()
  const { invoice_detail } = useInvoiceEditStoreData()

  const MyDoc = useMemo(() => {
    return <InvoicePDF invoice_detail={invoice_detail} />
  }, [invoice_detail])

  const [instance, updateInstance] = usePDF({ document: MyDoc || <></> })

  useEffect(() => {
    if (MyDoc) {
      updateInstance()
    }
  }, [invoice_detail])

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
        issued_date: invoice_detail.issued_date,
        created_date: invoice_detail.created_date,
        note: invoice_detail.note,
        tax: 21,
        sale_person: invoice_detail.sale_person,
        customer_id: invoice_detail.customer_id,
        items: invoice_detail.items,
        total: invoice_detail.total,
        file: instance.blob
      }

      mutate(data)
    } else {
      snackbar.error('Invalid PDF')
    }
  }

  return (
    <Button fullWidth variant='outlined' onClick={handleEditInvoice} disabled={isEditInvoiceLoading}>
      Edit
    </Button>
  )
}

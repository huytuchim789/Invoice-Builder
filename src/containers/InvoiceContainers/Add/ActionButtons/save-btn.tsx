import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { usePDF } from '@react-pdf/renderer'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Button } from '@mui/material'

import { useSnackbarWithContext } from 'src/@core/common/snackbar'
import { IInvoiceInfo, saveInvoice } from 'src/@core/utils/api/invoice/saveInvoice'
import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'
import { useInvoiceDetailStoreData } from './controller'
import InvoiceBoldFormatPDF from '../../InvoicePDF/BoldFormat/BoldFormat'
import { useSettingPdfStore } from '../../store/setting'
import InoviceLightFormatPdf from '../../InvoicePDF/LightFormat/LightFormat'

export const SaveButton = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const snackbar = useSnackbarWithContext()
  const { settingPdf } = useSettingPdfStore()
  const { invoice_detail } = useInvoiceDetailStoreData()

  const MyDoc: any = useMemo(() => {
    if (invoice_detail) {
      if (settingPdf.format === 'bold') {
        return <InvoiceBoldFormatPDF invoice_detail={invoice_detail} font={settingPdf.font} />
      } else {
        return <InoviceLightFormatPdf invoice_detail={invoice_detail} font={settingPdf.font} />
      }
    }
  }, [invoice_detail, settingPdf])

  const [instance, updateInstance] = usePDF({ document: MyDoc || <></> })

  useEffect(() => {
    if (MyDoc) {
      updateInstance()
    }
  }, [invoice_detail])

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
        issued_date: invoice_detail.issued_date,
        created_date: invoice_detail.created_date,
        note: invoice_detail.note,
        tax: 21,
        sale_person: invoice_detail.sale_person,
        customer_id: invoice_detail.customer_id,
        items: invoice_detail.items,
        total: String(invoice_detail.total),
        file: instance.blob
      }

      mutate(data)
    } else {
      snackbar.error('Invalid PDF')
    }
  }

  return (
    <Button type='button' fullWidth variant='outlined' onClick={handleSendInvoice} disabled={isSaveInvoiceLoading}>
      Save
    </Button>
  )
}

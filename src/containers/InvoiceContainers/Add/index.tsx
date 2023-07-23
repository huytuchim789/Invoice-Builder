import React, { createContext, useEffect, useMemo, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { Card, Grid } from '@mui/material'

import BusinessInfo from './BusinessInfo/BusinessInfo'
import InvoiceToInfo from './InvoiceToInfo/InvoiceToInfo'

import extendedDayJs from 'src/@core/utils/dayjs'
import ItemInfo from 'src/@core/components/Invoice/ItemInfo/ItemInfo'
import SaleInfo from 'src/@core/components/Invoice/SaleInfo/SaleInfo'
import NoteInfo from 'src/@core/components/Invoice/NoteInfo/NoteInfo'

import ActionButtons from './ActionButtons/Actions'
import { useSettingPdfStore } from '../store/setting'
import { useSettingStore } from 'src/views/account-settings/store'
import { globalStore } from 'src/@core/hocs/global-store'
import InvoiceBoldFormatPDF from '../InvoicePDF/BoldFormat/BoldFormat'
import InoviceLightFormatPdf from '../InvoicePDF/LightFormat/LightFormat'
import { usePDF } from '@react-pdf/renderer'
import useInvoiceStore from 'src/@core/components/Invoice/store'
import { IInvoiceInfo, saveInvoice } from 'src/@core/utils/api/invoice/saveInvoice'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useSnackbarWithContext } from 'src/@core/common/snackbar'
import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'
import SendMailModal from '../Modals/SendMailModal'
import { getItemsFormatData, getSubTotalItem } from 'src/@core/utils/common'

export const invoiceCurrentValue = {
  startDate: extendedDayJs().toDate(),
  endDate: extendedDayJs().toDate(),
  note: '',
  items: [
    {
      hours: '',
      cost: '',
      description: '',
      value: '{}'
    }
  ],
  user_id: ''
}

export const InvoiceAddContext = createContext({})

export const InvoiceAdd = () => {
  const { user } = globalStore((state: any) => state.userStore)
  const { info } = useSettingStore()
  const { settingPdf } = useSettingPdfStore()
  const { methodSending } = useInvoiceStore()

  const queryClient = useQueryClient()
  const router = useRouter()
  const snackbar = useSnackbarWithContext()

  const [emailContent, setEmailContent] = useState({
    subject: '',
    message: ''
  })
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleChangeEmailContent = (key: string, value: string) => {
    setEmailContent(prevState => ({ ...prevState, [key]: value }))
  }

  const methods = useForm({
    reValidateMode: 'onBlur',
    defaultValues: invoiceCurrentValue
  })

  const { startDate, endDate, note, items, user_id } = methods.watch()

  console.log('render')
  const invoice_detail: any = useMemo(() => {
    const userInfoParse = JSON.parse(user_id || '{}')
    const subTotal = items ? getSubTotalItem(items) : 0

    console.log(getItemsFormatData(items))
    return {
      id: '',
      updated_at: extendedDayJs(endDate).format('YYYY-MM-DD'),
      created_at: extendedDayJs(startDate).format('YYYY-MM-DD'),
      issued_date: extendedDayJs(endDate).format('YYYY-MM-DD'),
      created_date: extendedDayJs(startDate).format('YYYY-MM-DD'),
      note: note,
      tax: 21,
      sale_person: user?.name,
      customer_id: userInfoParse.id,
      items: getItemsFormatData(items),
      total: subTotal + (subTotal * 21) / 100,
      customer: userInfoParse,
      business: info
    }
  }, [user, startDate, endDate, note, items, user_id, info, methods.getValues()])

  const MyDoc: any = useMemo(() => {
    if (invoice_detail) {
      if (settingPdf.format === 'bold') {
        return <InvoiceBoldFormatPDF invoice_detail={invoice_detail} font={settingPdf.font} />
      } else {
        return <InoviceLightFormatPdf invoice_detail={invoice_detail} font={settingPdf.font} />
      }
    }
  }, [settingPdf, invoice_detail])

  const [instance, updateInstance] = usePDF({ document: MyDoc || <></> })

  useEffect(() => {
    if (MyDoc) {
      updateInstance()
    }
  }, [invoice_detail, MyDoc])

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

  const handleSaveInvoice: SubmitHandler<any> = data => {
    if (instance.blob !== null) {
      const mailSubject = methodSending.method === 'mail' ? emailContent : { subject: null, message: null }
      const userInfoParse = JSON.parse(user_id || '{}')
      const subTotal = data.items
        ? data.items.reduce((acc: any, item: any) => {
            const valueStr = item.value ? item.value : '{}'
            const cost = JSON.parse(valueStr)

            return acc + Number(item.hours) * Number(cost.price ? cost.price : 0)
          }, 0)
        : 0

      const formData: IInvoiceInfo = {
        issued_date: data.endDate,
        created_date: data.startDate,
        note: data.note,
        tax: 21,
        sale_person: user?.name,
        customer_id: userInfoParse.id,
        items: data.items,
        total: String(subTotal + (subTotal * 21) / 100),
        file: instance.blob,
        send_method: methodSending.method,
        ...mailSubject
      }

      mutate(formData)
    } else {
      snackbar.error('Invalid PDF')
    }
  }

  const data = {
    invoice_detail,
    isSaveInvoiceLoading,
    handleChangeEmailContent,
    setIsModalOpen
  }

  return (
    <InvoiceAddContext.Provider value={data}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSaveInvoice)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={9}>
              <Card style={{ width: '100%' }}>
                <BusinessInfo />
                <InvoiceToInfo />
                <ItemInfo />
                <SaleInfo />
                <NoteInfo />
              </Card>
            </Grid>
            <Grid item xs={12} md={12} lg={3}>
              <ActionButtons />
            </Grid>
          </Grid>
        </form>
      </FormProvider>
      <SendMailModal
        data={emailContent}
        isOpen={isModalOpen}
        handleCloseModal={() => setIsModalOpen(false)}
        handleChangeEmailContent={handleChangeEmailContent}
      />
    </InvoiceAddContext.Provider>
  )
}

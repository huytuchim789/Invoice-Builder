//@ts-nocheck
import React, { createContext, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { usePDF } from '@react-pdf/renderer'

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
import SendMailModal from '../Modals/SendMailModal'

import useInvoiceStore from 'src/@core/components/Invoice/store'
import { useSnackbarWithContext } from 'src/@core/common/snackbar'
import { useInvoiceDetailData } from 'src/@core/hooks/invoice/useInvoiceDetailData'
import { Item } from 'src/@core/models/api/invoice/invoice.interface'
import { useItemContentStore } from 'src/@core/components/Invoice/ItemInfo/store'
import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'
import { IInvoiceInfo, editInvoice } from 'src/@core/utils/api/invoice/editInvoice'
import { getItemsFormatData, getSubTotalItem } from 'src/@core/utils/common'

export const invoiceCurrentValue = {
  startDate: extendedDayJs().toDate(),
  endDate: extendedDayJs().toDate(),
  note: '',
  items: [
    {
      hours: '',
      description: '',
      value: '{}'
    }
  ],
  user_id: ''
}

export const InvoiceEditContext = createContext({})

export const InvoiceEdit = () => {
  const { user } = globalStore((state: any) => state.userStore)
  const { info } = useSettingStore()
  const { settingPdf } = useSettingPdfStore()
  const { methodSending } = useInvoiceStore()
  const { itemsInvoiceSelectList } = useItemContentStore()

  const queryClient = useQueryClient()
  const router = useRouter()
  const snackbar = useSnackbarWithContext()

  const [emailContent, setEmailContent] = useState({
    subject: '',
    message: ''
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [itemsListCurrent, setItemsListCurrent] = useState<any>([])

  const handleChangeEmailContent = (key: string, value: string) => {
    setEmailContent(prevState => ({ ...prevState, [key]: value }))
  }

  const methods = useForm({
    reValidateMode: 'onBlur',
    defaultValues: invoiceCurrentValue
  })

  const invoiceDetailQuery = useInvoiceDetailData(router.query.id as string)

  useEffect(() => {
    if (invoiceDetailQuery.data) {
      const itemsField: any = []

      methodSending.setMethod(invoiceDetailQuery.data.email_transaction.method)
      setEmailContent({
        subject: invoiceDetailQuery.data.email_transaction.email_subject,
        message: invoiceDetailQuery.data.email_transaction.email_message
      })
      invoiceDetailQuery.data.items.forEach((item: Item) => {
        const itemsFind = itemsInvoiceSelectList.find((itemSelect: any) => itemSelect.id === item.id)

        itemsField.push({
          value: JSON.stringify({ ...itemsFind }),
          description: item.pivot.description,
          hours: item.pivot.hours,
          item_id: item.pivot.item_id,
          pivot_id: item.pivot.id,
          cost: item.pivot.cost
        })
      })
      setItemsListCurrent(itemsField)

      methods.reset({
        startDate: extendedDayJs(invoiceDetailQuery.data.created_date).toDate(),
        endDate: extendedDayJs(invoiceDetailQuery.data.issued_date).toDate(),
        note: invoiceDetailQuery.data.note,
        items: itemsField,
        user_id: JSON.stringify(invoiceDetailQuery.data.customer)
      })
    }
  }, [invoiceDetailQuery.data])

  const { startDate, endDate, note, items, user_id } = methods.watch()

  const isLoadingScreen = useMemo(() => invoiceDetailQuery.isLoading, [invoiceDetailQuery.isLoading])

  const invoice_detail: any = useMemo(() => {
    const userInfoParse = JSON.parse(user_id || '{}')
    const subTotal = items ? getSubTotalItem(items) : 0

    return {
      id: invoiceDetailQuery.data?.id,
      updated_at: extendedDayJs(endDate).format('YYYY-MM-DD'),
      created_at: extendedDayJs(startDate).format('YYYY-MM-DD'),
      issued_date: extendedDayJs(endDate).format('YYYY-MM-DD'),
      created_date: extendedDayJs(startDate).format('YYYY-MM-DD'),
      note: note,
      tax: 8,
      sale_person: user?.name,
      customer_id: userInfoParse.id,
      items: getItemsFormatData(items),
      total: subTotal + (subTotal * 8) / 100,
      customer: userInfoParse,
      business: info,
      qr_code: invoiceDetailQuery?.data?.qr_code
    }
  }, [user, startDate, endDate, note, items, user_id, info])

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
  }, [invoice_detail])

  const { mutate, isLoading: isSaveInvoiceLoading } = useMutation({
    mutationFn: async (data: IInvoiceInfo) => await editInvoice(data),
    onSuccess: ({ data }: { data: { message: string } }) => {
      queryClient.invalidateQueries([QUERY_INVOICE_KEYS.EMAIL_TRANSACTION])
      queryClient.invalidateQueries([QUERY_INVOICE_KEYS.INVOICE_DETAIL, router.query.id as string])

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
      const itemsList: any[] = [
        ...data.items.map((item: any) => ({
          ...item,
          quantity: item.cost
        }))
      ]

      const mailSubject = methodSending.method === 'mail' ? emailContent : { subject: null, message: null }
      const userInfoParse = JSON.parse(user_id || '{}')
      const subTotal = data.items ? getSubTotalItem(data.items) : 0

      itemsListCurrent.forEach((item: any, index: number) => {
        if (!data.items[index]) {
          itemsList[index] = {
            ...item,
            quantity: item.cost,
            item_id: item.item_id,
            pivot_id: item.pivot_id,
            isDeleted: 1
          }
        } else {
          if (item.value !== data.items[index].value) {
            itemsList.splice(index, 0, {
              ...data.items[index],
              item_id: item.item_id,
              quantity: item.cost,
              pivot_id: item.pivot_id,
              isDeleted: 1
            })
          } else {
            itemsList[index] = {
              ...item,
              quantity: item.cost,
              item_id: item.item_id,
              pivot_id: item.pivot_id,
              isDeleted: 0
            }
          }
        }
      })

      const formData: IInvoiceInfo = {
        id: invoiceDetailQuery.data?.id || '',
        issued_date: data.endDate,
        created_date: data.startDate,
        note: data.note,
        tax: 8,
        sale_person: user?.name,
        customer_id: userInfoParse.id,
        items: itemsList,
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
    isLoadingScreen,
    handleChangeEmailContent,
    setIsModalOpen
  }

  return (
    <InvoiceEditContext.Provider value={data}>
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
      {isModalOpen && (
        <SendMailModal
          data={emailContent}
          isOpen={isModalOpen}
          handleCloseModal={() => setIsModalOpen(false)}
          handleChangeEmailContent={handleChangeEmailContent}
        />
      )}
    </InvoiceEditContext.Provider>
  )
}

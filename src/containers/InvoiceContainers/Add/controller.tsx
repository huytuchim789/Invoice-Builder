import { useEffect, useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { usePDF } from '@react-pdf/renderer'

import extendedDayJs from 'src/@core/utils/dayjs'
import { globalStore } from 'src/@core/hocs/global-store'

import { IStore } from 'src/@core/components/Invoice/ItemInfo/store'
import { useSettingStore } from 'src/views/account-settings/store'
import InvoiceBoldFormatPDF from '../InvoicePDF/BoldFormat/BoldFormat'
import InoviceLightFormatPdf from '../InvoicePDF/LightFormat/LightFormat'
import { useSettingPdfStore } from '../store/setting'

export const invoiceCurrentValue = {
  startDate: extendedDayJs().toDate(),
  endDate: extendedDayJs().toDate(),
  note: '',
  items: [
    {
      hours: '',
      cost: '',
      description: '',
      name: ''
    }
  ],
  user_id: ''
}

const ctx: Types.ControllerContext<IStore> = {}

const useInvoiceDetailController = () => {
  const { user } = globalStore((state: any) => state.userStore)
  const { info } = useSettingStore()
  const { settingPdf } = useSettingPdfStore()

  ctx.form = useForm({
    reValidateMode: 'onBlur',
    defaultValues: invoiceCurrentValue
  })

  const [startDate, endDate, note, items, userInfo] = ctx.form.watch([
    'startDate',
    'endDate',
    'note',
    'items',
    'user_id'
  ])

  const invoice_detail = useMemo(() => {
    const userInfoParse = JSON.parse(userInfo || '{}')
    const subTotal = items ? items.reduce((acc: any, item: any) => acc + Number(item.hours) * Number(item.cost), 0) : 0

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
      items: items,
      total: subTotal + (subTotal * 21) / 100,
      customer: userInfoParse,
      business: info
    }
  }, [user, startDate, endDate, note, items, userInfo, info])

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

  const handleSaveInvoice: SubmitHandler<any> = data => {
    console.log(data)
  }

  return {
    methods: ctx.form,
    handleSaveInvoice,
    invoice_detail
  }
}

export default useInvoiceDetailController

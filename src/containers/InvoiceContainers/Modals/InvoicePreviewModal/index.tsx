import { Box, Button, Dialog, DialogContent, DialogTitle, Fade } from '@mui/material'
import { PDFViewer } from '@react-pdf/renderer'
import { IInvoiceDetailLocalData } from 'src/@core/models/api/invoice/invoice.interface'
import InvoiceBoldFormatPDF from '../../InvoicePDF/BoldFormat/BoldFormat'
import SideBar from './SideBar'
import { useMemo, useState } from 'react'
import InoviceLightFormatPdf from '../../InvoicePDF/LightFormat/LightFormat'
import { useSettingPdfStore } from '../../store/setting'
import { useSettingStore } from 'src/views/account-settings/store'
import extendedDayJs from 'src/@core/utils/dayjs'
import { IItemContent } from 'src/@core/components/Invoice/ItemInfo/store'

interface Props {
  isOpen: boolean
  handleCloseModal: () => void
  invoice_detail: IInvoiceDetailLocalData
}

export interface ISettingState {
  format: string
  font: string
}

const InvoicePreviewModal = ({ isOpen, handleCloseModal, invoice_detail }: Props) => {
  const { setSettingPdf } = useSettingPdfStore()
  const [setting, setSetting] = useState<ISettingState>({
    format: 'bold',
    font: 'AlegreyaSans'
  })
  const { info } = useSettingStore()

  const invoiceDetailPdf = useMemo(() => {
    if (!invoice_detail) return null

    return {
      ...invoice_detail,
      updated_at: extendedDayJs(invoice_detail.created_date).format('YYYY-MM-DD'),
      created_at: extendedDayJs(invoice_detail.created_at).format('YYYY-MM-DD'),
      issued_date: extendedDayJs(invoice_detail.issued_date).format('YYYY-MM-DD'),
      created_date: extendedDayJs(invoice_detail.created_date).format('YYYY-MM-DD'),
      items: invoice_detail.items.map((item: IItemContent) => {
        return {
          cost: item.price,
          hours: item.pivot?.hours,
          quantity: item.pivot?.cost,
          price: 0,
          name: item.name,
          description: item.pivot?.description
        }
      })
    }
  }, [invoice_detail])
  return (
    <Dialog open={isOpen} onClose={handleCloseModal} TransitionComponent={Fade} fullWidth maxWidth='md'>
      <DialogTitle>Invoice Preview</DialogTitle>
      <DialogContent>
        <Box display='flex' gap={10}>
          <SideBar setSetting={setSetting} />
          <Box>
            <PDFViewer style={{ width: 400, height: 530 }} showToolbar={false}>
              {setting.format === 'bold' ? (
                <InvoiceBoldFormatPDF invoice_detail={invoiceDetailPdf} settingInfo={info} font={setting.font} />
              ) : (
                <InoviceLightFormatPdf invoice_detail={invoiceDetailPdf} settingInfo={info} font={setting.font} />
              )}
            </PDFViewer>
          </Box>
        </Box>
        <Box display='flex' justifyContent='flex-end'>
          <Button
            variant='contained'
            onClick={() => {
              setSettingPdf(setting)
              handleCloseModal()
            }}
          >
            Save
          </Button>
          <Button variant='outlined' onClick={() => handleCloseModal()}>
            Cancel
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default InvoicePreviewModal

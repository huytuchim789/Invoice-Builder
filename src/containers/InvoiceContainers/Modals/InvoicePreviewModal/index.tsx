import { Box, Button, Dialog, DialogContent, DialogTitle, Fade } from '@mui/material'
import { PDFViewer } from '@react-pdf/renderer'
import { IInvoiceDetailLocalData } from 'src/@core/models/api/invoice/invoice.interface'
import InvoiceBoldFormatPDF from '../../InvoicePDF/BoldFormat/BoldFormat'
import SideBar from './SideBar'
import { useState } from 'react'
import InoviceLightFormatPdf from '../../InvoicePDF/LightFormat/LightFormat'
import { useSettingPdfStore } from '../../store/setting'

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

  return (
    <Dialog open={isOpen} onClose={handleCloseModal} TransitionComponent={Fade} fullWidth maxWidth='md'>
      <DialogTitle>Invoice Preview</DialogTitle>
      <DialogContent>
        <Box display='flex' gap={10}>
          <SideBar setSetting={setSetting} />
          <Box>
            <PDFViewer style={{ width: 400, height: 530 }} showToolbar={false}>
              {setting.format === 'bold' ? (
                <InvoiceBoldFormatPDF invoice_detail={invoice_detail} font={setting.font} />
              ) : (
                <InoviceLightFormatPdf invoice_detail={invoice_detail} font={setting.font} />
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

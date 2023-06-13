import { Dialog, DialogContent, DialogTitle, Fade } from '@mui/material'
import { PDFViewer } from '@react-pdf/renderer'
import InvoicePDF from '../../InvoicePDF'
import { IInvoiceDetailData } from 'src/@core/models/api/invoice/invoice.interface'

interface Props {
  isOpen: boolean
  handleCloseModal: () => void
  invoice_detail: IInvoiceDetailData
}

const InvoicePreviewModal = ({ isOpen, handleCloseModal, invoice_detail }: Props) => {
  return (
    <Dialog open={isOpen} onClose={handleCloseModal} TransitionComponent={Fade} fullWidth maxWidth='md'>
      <DialogTitle>Invoice Preview</DialogTitle>
      <DialogContent>
        <PDFViewer style={{ width: '100%' }} height={700}>
          <InvoicePDF invoice_detail={invoice_detail} />
        </PDFViewer>
      </DialogContent>
    </Dialog>
  )
}

export default InvoicePreviewModal

import { Button } from '@mui/material'
import InvoicePreviewModal from '../../Modals/InvoicePreviewModal'
import { useContext, useState } from 'react'
import { InvoiceAddContext } from '..'

export const PreviewButton = () => {
  const { invoice_detail } = useContext(InvoiceAddContext) as { invoice_detail: any }
  const [isOpenInvoicePreviewModal, setIsOpenInvoicePreviewModal] = useState<boolean>(false)

  return (
    <>
      <Button fullWidth variant='outlined' onClick={() => setIsOpenInvoicePreviewModal(true)}>
        Preview
      </Button>
      <InvoicePreviewModal
        isOpen={isOpenInvoicePreviewModal}
        handleCloseModal={() => setIsOpenInvoicePreviewModal(false)}
        invoice_detail={invoice_detail}
      />
    </>
  )
}

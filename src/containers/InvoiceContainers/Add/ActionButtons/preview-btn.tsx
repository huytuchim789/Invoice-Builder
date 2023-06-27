import { Button } from '@mui/material'
import InvoicePreviewModal from '../../Modals/InvoicePreviewModal'
import { useState } from 'react'
import { useInvoiceDetailStoreData } from './controller'

export const PreviewButton = () => {
  const { invoice_detail } = useInvoiceDetailStoreData()

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

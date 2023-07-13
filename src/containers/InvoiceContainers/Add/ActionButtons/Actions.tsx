import dynamic from 'next/dynamic'
import { Box, Card } from '@mui/material'

import SendingMethodSelect from 'src/@core/components/Invoice/SendingMethodSelect/SendingMethodSelect'
import { PreviewButton } from './preview-btn'
import SendMailModal from '../../Modals/SendMailModal'
import { useContext, useState } from 'react'
import { InvoiceAddContext } from '..'

const SaveButton = dynamic<any>(() => import('./save-btn').then(mod => mod.SaveButton), {
  ssr: false
})

const ActionButtons = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { handleChangeEmailContent } = useContext(InvoiceAddContext) as { handleChangeEmailContent: any }

  return (
    <>
      <Card>
        <Box p={3} display={'flex'} flexDirection={'column'} gap={'10px'}>
          <SaveButton />
          <PreviewButton />
        </Box>
      </Card>
      <Box mt={6}>
        <SendingMethodSelect handleOpenMailModal={() => setIsModalOpen(true)} />
      </Box>
      <SendMailModal
        isOpen={isModalOpen}
        handleCloseModal={() => setIsModalOpen(false)}
        handleChangeSubjectMessage={handleChangeEmailContent}
      />
    </>
  )
}

export default ActionButtons

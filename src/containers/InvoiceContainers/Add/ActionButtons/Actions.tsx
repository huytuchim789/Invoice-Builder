import dynamic from 'next/dynamic'
import { Box, Card } from '@mui/material'

import SendingMethodSelect from 'src/@core/components/Invoice/SendingMethodSelect/SendingMethodSelect'
import { PreviewButton } from './preview-btn'
import SendMailModal from '../../Modals/SendMailModal'
import { useState } from 'react'

const SaveButton = dynamic<any>(() => import('./save-btn').then(mod => mod.SaveButton), {
  ssr: false
})

const ActionButtons = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [emailContent, setEmailContent] = useState({
    subject: '',
    message: ''
  })

  const handleChangeEmailContent = (subject: string, message: string) => {
    setEmailContent({
      subject,
      message
    })
  }

  return (
    <>
      <Card>
        <Box p={3} display={'flex'} flexDirection={'column'} gap={'10px'}>
          <SaveButton emailContent={emailContent} />
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

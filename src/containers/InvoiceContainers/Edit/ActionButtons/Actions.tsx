import dynamic from 'next/dynamic'
import { Box, Card } from '@mui/material'

import SendingMethodSelect from 'src/@core/components/Invoice/SendingMethodSelect/SendingMethodSelect'
import { PreviewButton } from './preview-btn'
import { useContext } from 'react'
import { InvoiceAddContext } from '..'

const SaveButton = dynamic<any>(() => import('./save-btn').then(mod => mod.SaveButton), {
  ssr: false
})

const ActionButtons = () => {
  const { setIsModalOpen } = useContext(InvoiceAddContext) as any
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
    </>
  )
}

export default ActionButtons

import { Box, Button, Card, InputAdornment } from '@mui/material'
import { AddPaymentButton } from '../action-tab/add-payment-btn'
import { ReviewButton } from '../action-tab/review'
import { PreviewButton } from '../action-tab/preview-btn'
import { globalStore } from 'src/@core/hocs/global-store'

const ActionTab = () => {
  const { user } = globalStore(state => state.userStore)

  return (
    <Card>
      <Box p={3} display='flex' flexDirection={'column'} gap={'10px'}>
        <PreviewButton />
        <ReviewButton />
       {user?.role==='guest'?<></>: <AddPaymentButton />}
      </Box>
    </Card>
  )
}

export default ActionTab

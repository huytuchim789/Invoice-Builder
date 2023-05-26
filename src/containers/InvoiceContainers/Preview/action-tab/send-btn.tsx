import { InputAdornment, Button } from '@mui/material'

import SendIcon from '@mui/icons-material/Send'
import { useInvoicePreviewStore } from '../store'

export const SendInvoiceButton = () => {
  const { setStatus } = useInvoicePreviewStore((state: any) => state.statusDrawerSendInvoiceStore)

  return (
    <Button
      fullWidth
      type='button'
      variant='contained'
      startIcon={
        <InputAdornment position='start'>
          <SendIcon style={{ color: '#FFF' }} />
        </InputAdornment>
      }
      onClick={() => setStatus(true)}
    >
      Send Invoice
    </Button>
  )
}

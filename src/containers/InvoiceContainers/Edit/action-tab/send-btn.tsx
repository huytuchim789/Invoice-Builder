import { InputAdornment, Button } from '@mui/material'

import SendIcon from '@mui/icons-material/Send'

export const SendInvoiceButton = () => {
  return (
    <Button
      fullWidth
      variant='contained'
      startIcon={
        <InputAdornment position='start'>
          <SendIcon style={{ color: '#FFF' }} />
        </InputAdornment>
      }
    >
      Send Invoice
    </Button>
  )
}

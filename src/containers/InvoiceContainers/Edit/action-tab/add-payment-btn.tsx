import { InputAdornment, Button } from '@mui/material'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

export const AddPaymentButton = () => {
  return (
    <Button
      fullWidth
      variant='contained'
      color='success'
      startIcon={
        <InputAdornment position='start'>
          <AttachMoneyIcon style={{ color: '#FFF' }} />
        </InputAdornment>
      }
    >
      Add Payment
    </Button>
  )
}

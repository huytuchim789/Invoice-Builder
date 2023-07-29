import { Box, Button, Card, InputAdornment } from '@mui/material'

import SendIcon from '@mui/icons-material/Send'

const ActionTab = () => {
  return (
    <Card>
      <Box p={3} display='flex' flexDirection={'column'} gap={'10px'}>
        <Button
          fullWidth
          type='button'
          variant='contained'
          startIcon={
            <InputAdornment position='start'>
              <SendIcon style={{ color: '#FFF' }} />
            </InputAdornment>
          }
        >
          Send Invoice
        </Button>
        <Button fullWidth variant='outlined'>
          Preview
        </Button>
      </Box>
    </Card>
  )
}

export default ActionTab

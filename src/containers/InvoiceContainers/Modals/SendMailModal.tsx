// ** React imports

// ** MUI Library imports
import { Box, Button, Drawer, Stack, TextField, Typography } from '@mui/material'

// ** Icon imports
import CloseIcon from '@mui/icons-material/Close'
import useInvoiceStore from 'src/@core/components/Invoice/store'

interface IField {
  label: string
  value: 'subject' | 'message'
  multiple: boolean
  helpText: string
}

interface Props {
  data: {
    subject: string | null
    message: string | null
  }
  isOpen: boolean
  handleCloseModal: () => void
  handleChangeEmailContent: (key: string, value: string) => void
}

const fields: IField[] = [
  {
    label: 'Subject',
    value: 'subject',
    multiple: false,
    helpText: 'Email is required'
  },
  {
    label: 'Message',
    value: 'message',
    multiple: true,
    helpText: 'Message is required'
  }
]

const SendMailModal = ({ isOpen, data, handleCloseModal, handleChangeEmailContent }: Props) => {
  const { methodSending } = useInvoiceStore()

  const handleSave = () => {
    handleCloseModal()
  }

  const handleChangeTextFeild = (props: string) => (event: any) => {
    handleChangeEmailContent(props, event.target.value)
  }

  const handleClose = () => {
    handleCloseModal()
    methodSending.setMethod('web')
  }

  return (
    <Drawer anchor='right' open={isOpen} onClose={handleClose}>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        paddingX={2}
        paddingY={4}
        bgcolor='#808080'
      >
        <Typography fontSize={20} style={{ color: '#FFF' }}>
          Send Invoice
        </Typography>
        <Box component='div' onClick={handleClose} style={{ cursor: 'pointer' }}>
          <CloseIcon style={{ color: '#FFF' }} />
        </Box>
      </Stack>
      <Box sx={{ width: 300, padding: 2 }} role='presentation' display='flex' flexDirection='column' gap={3}>
        {fields.map((field: IField, index: number) => (
          <Box key={`${field}-${index}`}>
            <TextField
              label={field.label}
              defaultValue={data[field.value]}
              onChange={handleChangeTextFeild(field.value)}
              multiline={field.multiple}
              minRows={5}
              maxRows={5}
              fullWidth
            />
          </Box>
        ))}
        <Stack direction='row' gap={3}>
          <Button type='button' onClick={handleSave} variant='contained' fullWidth>
            Save
          </Button>
          <Button type='button' onClick={handleClose} variant='outlined' fullWidth>
            Cancel
          </Button>
        </Stack>
      </Box>
    </Drawer>
  )
}

export default SendMailModal

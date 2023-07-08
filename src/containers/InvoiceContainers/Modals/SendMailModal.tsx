// ** React imports
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

// ** MUI Library imports
import { Box, Button, Drawer, Stack, TextField, Typography } from '@mui/material'

// ** Icon imports
import CloseIcon from '@mui/icons-material/Close'
import useInvoiceStore from 'src/@core/components/Invoice/store'

interface IField {
  label: string
  value: string
  multiple: boolean
  helpText: string
}

interface Props {
  isOpen: boolean
  handleCloseModal: () => void
  handleChangeSubjectMessage: (subject: string, message: string) => void
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

const SendMailModal = ({ isOpen, handleCloseModal, handleChangeSubjectMessage }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const { methodSending } = useInvoiceStore()

  const onSubmit: SubmitHandler<FieldValues> = data => {
    handleChangeSubjectMessage(data.subject, data.message)
    handleCloseModal()
  }

  const handleClose = () => {
    handleCloseModal()
    reset()
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ width: 300, padding: 2 }} role='presentation' display='flex' flexDirection='column' gap={3}>
          {fields.map((field: IField, index: number) => (
            <Box key={`${field}-${index}`}>
              <TextField
                label={field.label}
                error={!!errors[field.value]}
                defaultValue=''
                multiline={field.multiple}
                minRows={5}
                maxRows={5}
                {...register(field.value, { required: true })}
                fullWidth
                helperText={errors[field.value] && field.helpText}
              />
            </Box>
          ))}
          <Stack direction='row' gap={3}>
            <Button type='submit' variant='contained' fullWidth>
              Save
            </Button>
            <Button type='button' variant='outlined' fullWidth>
              Cancel
            </Button>
          </Stack>
        </Box>
      </form>
    </Drawer>
  )
}

export default SendMailModal

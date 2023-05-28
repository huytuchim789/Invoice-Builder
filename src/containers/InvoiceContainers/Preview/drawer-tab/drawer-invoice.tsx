// ** React imports
import { useContext } from 'react'
import { useRouter } from 'next/router'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { usePDF } from '@react-pdf/renderer'

// ** MUI Library imports
import { Box, Button, Drawer, Stack, TextField, Typography } from '@mui/material'

// ** Interface imports
import { IInvoiceDetailData } from 'src/@core/models/api/invoice/invoice.interface'

// ** Common imports
import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'
import { useSnackbarWithContext } from 'src/@core/common/snackbar'

// ** Store imports
import { useInvoicePreviewStore } from '../store'

// ** Icon imports
import CloseIcon from '@mui/icons-material/Close'
import InvoicePDF from '../../InvoicePDF'
import { InvoiceDetailContext } from '..'
import { sendInvoiceByMail } from 'src/@core/utils/api/invoice/sendInvoiceByMail'

interface IField {
  label: string
  value: string
  multiple: boolean
  helpText: string
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
    helpText: 'Country is required'
  }
]

export const DrawerSendInvoice = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()
  const { invoice_detail } = useContext(InvoiceDetailContext) as { invoice_detail: IInvoiceDetailData }
  const MyDoc = <InvoicePDF invoice_detail={invoice_detail} />

  const [instance] = usePDF({ document: MyDoc })

  const { status, setStatus } = useInvoicePreviewStore((state: any) => state.statusDrawerSendInvoiceStore)
  const snackbar = useSnackbarWithContext()

  const handleUploadPdf = async (data: FieldValues): Promise<any> => {
    if (instance.blob) {
      const formData = new FormData()

      formData.append('invoice_id', invoice_detail.id)
      formData.append('message', data.message)
      formData.append('subject', data.subject)
      formData.append('file', instance.blob, 'file.pdf')

      return await sendInvoiceByMail(formData)
    }
  }

  const { mutate, isLoading: isAddCustomerLoading } = useMutation({
    mutationFn: (data: FieldValues): Promise<any> => handleUploadPdf(data),
    onSuccess: (data: { data: { message: string } }) => {
      queryClient.invalidateQueries([QUERY_INVOICE_KEYS.EMAIL_TRANSACTION])

      reset()
      setStatus(false)
      router.push('/invoice/list')
      snackbar.success(data.data.message)
    },
    onError: (err: { response: { data: { message: string } } }) => {
      const { response } = err

      snackbar.error(response.data.message)
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = data => {
    mutate(data)
  }

  return (
    <Drawer anchor='right' open={status} onClose={() => setStatus(false)}>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        paddingX={2}
        paddingY={4}
        bgcolor='#808080'
      >
        <Typography fontSize={20} style={{ color: '#FFF' }}>
          Add Custom User
        </Typography>
        <Box component='div' onClick={() => setStatus(false)} style={{ cursor: 'pointer' }}>
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
              />
              {errors[field.value] && (
                <Typography color={'red'} fontSize={12}>
                  {field.helpText}
                </Typography>
              )}
            </Box>
          ))}
          <Stack direction='row' gap={3}>
            <Button type='submit' variant='contained' fullWidth disabled={isAddCustomerLoading}>
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

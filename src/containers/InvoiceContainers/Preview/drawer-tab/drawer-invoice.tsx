// ** React imports
import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'

// ** MUI Library imports
import { Box, Button, Drawer, Stack, TextField, Typography } from '@mui/material'

// ** Interface imports
import { IAddCustomerUserDataResponseError } from 'src/@core/models/api/invoice/error.interface'
import {
  IAddUserSelectInvoiceToDataResponse,
  IUserSelectInvoiceTo
} from 'src/@core/models/api/invoice/invoice.interface'

// ** Common imports
import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'
import { useSnackbarWithContext } from 'src/@core/common/snackbar'
import { ICustomerUsers, addCustomerUser } from 'src/@core/utils/api/invoice/addCustomerUser'

// ** Store imports
import { useInvoicePreviewStore } from '../store'

// ** Icon imports
import CloseIcon from '@mui/icons-material/Close'

interface IField {
  label: string
  value: string
  multiple: boolean
  helpText: string
}

const fields: IField[] = [
  {
    label: 'From',
    value: 'from',
    multiple: false,
    helpText: 'Name is required'
  },
  {
    label: 'To',
    value: 'to',
    multiple: false,
    helpText: 'Company is required'
  },
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()
  const queryClient = useQueryClient()

  const { status, setStatus } = useInvoicePreviewStore((state: any) => state.statusDrawerSendInvoiceStore)
  const snackbar = useSnackbarWithContext()

  const { mutate, isLoading: isAddCustomerLoading } = useMutation({
    mutationFn: async (data: ICustomerUsers) => await addCustomerUser(data),
    onSuccess: ({ data }: { data: IAddUserSelectInvoiceToDataResponse }) => {
      queryClient.setQueryData([QUERY_INVOICE_KEYS.USER_SELECT], (previousUser: IUserSelectInvoiceTo[] | undefined) =>
        previousUser ? [...previousUser, data.data] : previousUser
      )

      reset()
      setStatus(false)
      snackbar.success(data.message)
    },
    onError: (err: { response: IAddCustomerUserDataResponseError }) => {
      const { response } = err

      snackbar.error(response.data.message)
    }
  })

  const onSubmit = async (data: SubmitHandler<IUserSelectInvoiceTo> & any) => {
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

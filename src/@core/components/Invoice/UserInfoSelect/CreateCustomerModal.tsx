// ** React imports
import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'

// ** MUI Library imports
import { Box, Button, Drawer, Grid, Stack, TextField, Typography } from '@mui/material'

// ** Interface imports
import {
  IAddUserSelectInvoiceToDataResponse,
  IUserSelectInvoiceTo
} from 'src/@core/models/api/invoice/invoice.interface'
import { IAddCustomerUserDataResponseError } from 'src/@core/models/api/invoice/error.interface'

// ** Common imports
import { useSnackbarWithContext } from 'src/@core/common/snackbar'
import { ICustomerUsers, addCustomerUser } from 'src/@core/utils/api/invoice/addCustomerUser'
import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'

// ** Icon imports
import CloseIcon from '@mui/icons-material/Close'

interface IField {
  label: string
  value: string
  helpText: string
}

interface Props {
  isOpenModal: boolean
  handleCloseModal: () => void
}

const fields: IField[] = [
  {
    label: 'Name',
    value: 'name',
    helpText: 'Name is required'
  },
  {
    label: 'Company',
    value: 'company',
    helpText: 'Company is required'
  },
  {
    label: 'Email',
    value: 'email',
    helpText: 'Email is required'
  },
  {
    label: 'Country',
    value: 'country',
    helpText: 'Country is required'
  },
  {
    label: 'Address',
    value: 'address',
    helpText: 'Address is required'
  },
  {
    label: 'Contact Number',
    value: 'contact_number',
    helpText: 'Contact Number is required'
  },
  {
    label: 'Country Code',
    value: 'contact_number_country',
    helpText: 'Contact Number is required'
  }
]

const CreateCustomerModal = ({ isOpenModal, handleCloseModal }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()
  const queryClient = useQueryClient()

  const snackbar = useSnackbarWithContext()

  const { mutate, isLoading: isAddCustomerLoading } = useMutation({
    mutationFn: async (data: ICustomerUsers) => await addCustomerUser(data),
    onSuccess: ({ data }: { data: IAddUserSelectInvoiceToDataResponse }) => {
      queryClient.invalidateQueries([QUERY_INVOICE_KEYS.USER_SELECT])

      snackbar.success(data.message)
      reset()
      handleCloseModal()
    },
    onError: (err: { response: IAddCustomerUserDataResponseError }) => {
      const { response } = err

      handleCloseModal()
      snackbar.error(response.data.message)
    }
  })

  const onSubmit = async (data: SubmitHandler<IUserSelectInvoiceTo> & any) => {
    mutate(data)
  }

  return (
    <Drawer
      anchor='right'
      open={isOpenModal}
      onClose={() => {
        reset()
        handleCloseModal()
      }}
    >
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
        <Box
          component='div'
          onClick={() => {
            reset()
            handleCloseModal()
          }}
          style={{ cursor: 'pointer' }}
        >
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
          <Grid container justifyContent='space-between'>
            <Grid item lg={5}>
              <Button type='submit' variant='contained' fullWidth disabled={isAddCustomerLoading}>
                Save
              </Button>
            </Grid>
            <Grid item lg={5}>
              <Button type='button' variant='outlined' fullWidth>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Drawer>
  )
}

export default CreateCustomerModal

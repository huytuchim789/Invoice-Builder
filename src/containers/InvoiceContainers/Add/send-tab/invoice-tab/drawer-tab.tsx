// ** React imports
import { useForm, SubmitHandler } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

// ** MUI Library imports
import { Box, Button, Drawer, TextField, Typography } from '@mui/material'

// ** Interface imports
import { IUserSelectInvoiceTo } from 'src/@core/models/api/invoice.interface'

// ** Common imports
import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'
import { useSnackbarWithContext } from 'src/@core/common/snackbar'

// ** Store imports
import { useInvoiceAddStore } from '../../store'

interface IField {
  label: string
  value: string
  helpText: string
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
  }
]

export const DrawerNewCustomer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()
  const queryClient = useQueryClient()

  const { status, setStatus } = useInvoiceAddStore((state: any) => state.statusDrawerStore)
  const snackbar = useSnackbarWithContext()

  const onSubmit = async (data: SubmitHandler<IUserSelectInvoiceTo> & any) => {
    await axios.post('https://62f29501b1098f150815e793.mockapi.io/select', data)

    queryClient.invalidateQueries([QUERY_INVOICE_KEYS.USER_SELECT])
    reset()
    setStatus(false)
    snackbar.success('Create User Successfully')
  }

  return (
    <Drawer anchor='right' open={status} onClose={() => setStatus(false)}>
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
        </Box>
        <Button type='submit'>Save</Button>
      </form>
    </Drawer>
  )
}

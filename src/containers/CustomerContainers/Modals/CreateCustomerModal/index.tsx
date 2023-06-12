import { FormProvider, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Box, Button, Dialog, DialogContent, DialogTitle, Fade, Grid, Stack, Typography } from '@mui/material'

import FormItem from '../atoms/FormItem'
import { ICustomerUsers, addCustomerUser } from 'src/@core/utils/api/invoice/addCustomerUser'
import {
  IAddUserSelectInvoiceToDataResponse,
  IUserSelectInvoiceTo
} from 'src/@core/models/api/invoice/invoice.interface'

import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'
import { useSnackbarWithContext } from 'src/@core/common/snackbar'
import { IAddCustomerUserDataResponseError } from 'src/@core/models/api/invoice/error.interface'

interface Props {
  isOpen: boolean
  handleCloseModal: () => void
}

const CreateCustomerModal = ({ isOpen, handleCloseModal }: Props) => {
  const queryClient = useQueryClient()
  const form = useForm()
  const snackbar = useSnackbarWithContext()

  const { mutate, isLoading: isAddCustomerLoading } = useMutation({
    mutationFn: async (data: ICustomerUsers) => await addCustomerUser(data),
    onSuccess: ({ data }: { data: IAddUserSelectInvoiceToDataResponse }) => {
      queryClient.setQueryData([QUERY_INVOICE_KEYS.USER_SELECT], (previousUser: IUserSelectInvoiceTo[] | undefined) =>
        previousUser ? [...previousUser, data.data] : previousUser
      )

      form.reset()
      handleCloseModal()
      snackbar.success(data.message)
    },
    onError: (err: { response: IAddCustomerUserDataResponseError }) => {
      const { response } = err

      snackbar.error(response.data.message)
    }
  })

  const handleCreateCustomerModal = (value: any) => {
    mutate(value)
  }

  return (
    <Dialog open={isOpen} onClose={handleCloseModal} TransitionComponent={Fade} fullWidth maxWidth='md'>
      <DialogTitle>
        <Box display='flex' gap={3} justifyContent='space-between' alignItems='center'>
          <Typography>Customer Create</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleCreateCustomerModal)}>
            <Grid container spacing={3}>
              <Grid item lg={6} md={6} sm={6}>
                <FormItem title='Name' info='name' />
                <FormItem title='Email' info='email' />
                <FormItem title='Address' info='address' />
              </Grid>
              <Grid item lg={6} md={6} sm={6}>
                <FormItem title='Company' info='company' />
                <FormItem title='Country' info='country' />
                <FormItem title='Contact Number' info='contact_number' />
                <FormItem title='Contact Number Country' info='contact_number_country' />
              </Grid>
            </Grid>
            <Stack justifyContent='center' spacing={3} mt={3}>
              <Button type='submit' variant='contained' disabled={isAddCustomerLoading}>
                Create
              </Button>
              <Button type='button' variant='outlined' onClick={handleCloseModal}>
                Cancel
              </Button>
            </Stack>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}

export default CreateCustomerModal

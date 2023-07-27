//@ts-nocheck
import { Box, Button, Dialog, DialogContent, DialogTitle, Fade, Grid, Stack, Switch, Typography } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import { IUserSelectInvoiceTo } from 'src/@core/models/api/invoice/invoice.interface'
import { useState } from 'react'
import FormItem from '../atoms/FormItem'

interface Props {
  isOpen: boolean
  handleCloseModal: () => void
  customer_detail: IUserSelectInvoiceTo
}

const CustomerDetailModal = ({ isOpen, handleCloseModal, customer_detail }: Props) => {
  const form = useForm()

  const [isReadOnly, setIsReadOnly] = useState<boolean>(true)

  const handleEditDetailModal = (value: any) => {
    alert(value)
  }

  const handleChangeEdit = (e: { target: { checked: boolean | ((prevState: boolean) => boolean) } }) => {
    setIsReadOnly(!e.target.checked)
  }

  return (
    <Dialog open={isOpen} onClose={handleCloseModal} TransitionComponent={Fade} fullWidth maxWidth='md'>
      <DialogTitle>
        <Box display='flex' gap={3} justifyContent='space-between' alignItems='center'>
          <Typography>Customer Detail</Typography>
          <Box display='flex' gap={3} alignItems='center'>
            <Typography>Edit Customer</Typography>
            <Switch onChange={handleChangeEdit} defaultChecked={!isReadOnly} />
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleEditDetailModal)}>
            <Grid container spacing={3}>
              <Grid item lg={6} md={6} sm={6}>
                <FormItem title='ID' info='id' props={{ value: customer_detail.id, InputProps: { readOnly: true } }} />
                <FormItem
                  title='Name'
                  info='name'
                  props={{ defaultValue: customer_detail.name, InputProps: { readOnly: isReadOnly } }}
                />
                <FormItem
                  title='Email'
                  info='email'
                  props={{ defaultValue: customer_detail.email, InputProps: { readOnly: isReadOnly } }}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6}>
                <FormItem
                  title='Company'
                  info='company'
                  props={{ defaultValue: customer_detail.company, InputProps: { readOnly: isReadOnly } }}
                />
                <FormItem
                  title='Country'
                  info='country'
                  props={{ defaultValue: customer_detail.country, InputProps: { readOnly: isReadOnly } }}
                />
                <FormItem
                  title='Contact Number'
                  info='contact_number'
                  props={{ defaultValue: customer_detail.contact_number, InputProps: { readOnly: isReadOnly } }}
                />
              </Grid>
            </Grid>
            <Stack justifyContent='center' spacing={3} mt={3}>
              <Button type='submit' variant='contained' disabled={isReadOnly}>
                Edit
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

export default CustomerDetailModal

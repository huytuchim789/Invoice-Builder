import { Box, Button, Dialog, DialogContent, DialogTitle, Fade, Grid, Stack, Switch, Typography } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import { IItemsData } from 'src/@core/models/api/invoice/invoice.interface'
import { useState } from 'react'
import FormItem from '../atoms/FormItem'

interface Props {
  isOpen: boolean
  handleCloseModal: () => void
  itemDetail: IItemsData
}

const ItemDetailModal = ({ isOpen, handleCloseModal, itemDetail }: Props) => {
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
          <Typography>Item Detail</Typography>
          <Box display='flex' gap={3} alignItems='center'>
            <Typography>Edit Item</Typography>
            <Switch onChange={handleChangeEdit} defaultChecked={!isReadOnly} />
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleEditDetailModal)}>
            <Grid container spacing={3}>
              <Grid item lg={6} md={6} sm={6}>
                <FormItem title='ID' info='id' props={{ value: itemDetail.id, InputProps: { readOnly: true } }} />
                <FormItem
                  title='Name'
                  info='name'
                  props={{ defaultValue: itemDetail.name, InputProps: { readOnly: isReadOnly } }}
                />
                <FormItem
                  title='Price'
                  info='price'
                  props={{ defaultValue: itemDetail.price, InputProps: { readOnly: isReadOnly } }}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6}>
                <FormItem
                  title='Organization Name'
                  info='organization_name'
                  props={{
                    sx: { cursor: 'not-allowed' },
                    defaultValue: itemDetail.organization.name,
                    InputProps: { readOnly: isReadOnly },
                    disabled: true
                  }}
                />
                <FormItem
                  title='Organization Address'
                  info='organization_address'
                  props={{
                    sx: { cursor: 'not-allowed' },

                    defaultValue: itemDetail.organization.address,
                    InputProps: { readOnly: isReadOnly },
                    disabled: true
                  }}
                />
                <FormItem
                  title='Organization Phone Number'
                  info='organization_phone'
                  props={{
                    sx: { cursor: 'not-allowed' },

                    defaultValue: itemDetail.organization.phone,
                    InputProps: { readOnly: isReadOnly },
                    disabled: true
                  }}
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

export default ItemDetailModal

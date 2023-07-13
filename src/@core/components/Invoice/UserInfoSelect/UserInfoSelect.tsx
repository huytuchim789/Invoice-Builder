import { useState } from 'react'

import { Box, FormControl, Select, MenuItem, Typography } from '@mui/material'

import { useSelectUserInvoiceTo } from 'src/@core/hooks/invoice/useSelectUserInvoiceTo'
import { IUserSelectInvoiceTo } from 'src/@core/models/api/invoice/invoice.interface'
import CreateCustomerModal from './CreateCustomerModal'
import { useFormContext } from 'react-hook-form'

interface Props {
  hasModal?: boolean
}

const UserInfoSelect = ({ hasModal }: Props) => {
  const {
    register,
    formState: { errors }
  } = useFormContext()
  const { data: user_select } = useSelectUserInvoiceTo()

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const handleCloseModal = () => {
    setIsOpenModal(false)
  }

  return (
    <Box mt={2}>
      <FormControl variant='outlined' sx={{ minWidth: 120 }}>
        <Select
          labelId='demo-simple-select-standard-label'
          id='demo-simple-select-standard'
          defaultValue=''
          {...register('user_id', { required: true })}
          size='small'
        >
          {hasModal && (
            <MenuItem value='' onClick={() => setIsOpenModal(true)}>
              Add new customer
            </MenuItem>
          )}
          {user_select &&
            user_select.data?.map((user: IUserSelectInvoiceTo) => (
              <MenuItem value={JSON.stringify(user)} key={user.id}>
                {user.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      {errors.user_id && <Typography color={'red'}>This field is required</Typography>}
      <CreateCustomerModal isOpenModal={isOpenModal} handleCloseModal={handleCloseModal} />
    </Box>
  )
}

export default UserInfoSelect

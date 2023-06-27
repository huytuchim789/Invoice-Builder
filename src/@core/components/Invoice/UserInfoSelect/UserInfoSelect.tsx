import { useState } from 'react'

import { Box, FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material'

import { useSelectUserInvoiceTo } from 'src/@core/hooks/invoice/useSelectUserInvoiceTo'
import { IUserSelectInvoiceTo } from 'src/@core/models/api/invoice/invoice.interface'
import CreateCustomerModal from './CreateCustomerModal'
import { useUserSelectStore } from './store'

interface Props {
  hasModal?: boolean
}

const UserInfoSelect = ({ hasModal }: Props) => {
  const { setUser } = useUserSelectStore()
  const { data: user_select } = useSelectUserInvoiceTo()

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const handleCloseModal = () => {
    setIsOpenModal(false)
  }

  const handleChangeUserSelect = (event: SelectChangeEvent<string>) => {
    if (event.target.value !== '') {
      setUser(JSON.parse(event.target.value))
    }
  }

  return (
    <Box mt={2}>
      <FormControl variant='outlined' sx={{ minWidth: 120 }}>
        <Select
          labelId='demo-simple-select-standard-label'
          id='demo-simple-select-standard'
          defaultValue=''
          onChange={handleChangeUserSelect}
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
      <CreateCustomerModal isOpenModal={isOpenModal} handleCloseModal={handleCloseModal} />
    </Box>
  )
}

export default UserInfoSelect

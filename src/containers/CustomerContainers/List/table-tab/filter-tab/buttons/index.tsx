import { Box, Button } from '@mui/material'
import { useState } from 'react'
import CreateCustomerModal from 'src/containers/CustomerContainers/Modals/CreateCustomerModal'

const TableHeaderButtons = () => {
  const [isOpenCreateCustomerModal, setIsOpenCreateCustomerModal] = useState<boolean>(false)

  return (
    <Box display='flex' gap={3} alignContent='center'>
      <Button variant='contained' size='small' onClick={() => setIsOpenCreateCustomerModal(true)}>
        Create Customer
      </Button>
      <Button variant='outlined' size='small'>
        Export
      </Button>
      <CreateCustomerModal
        isOpen={isOpenCreateCustomerModal}
        handleCloseModal={() => setIsOpenCreateCustomerModal(false)}
      />
    </Box>
  )
}

export default TableHeaderButtons

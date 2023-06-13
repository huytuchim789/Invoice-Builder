import { useState } from 'react'
import { Stack, Popover, Button, styled, Typography } from '@mui/material'

import ExpandMoreIcon from '@mui/icons-material/ExpandCircleDownOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/EditOutlined'
import { IUserSelectInvoiceTo } from 'src/@core/models/api/invoice/invoice.interface'
import CustomerDetailModal from 'src/containers/CustomerContainers/Modals/CustomerDetailModal'

interface Props {
  params: IUserSelectInvoiceTo
}

const ActionButton = styled('div')({
  padding: '10px 15px',
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  cursor: 'pointer',
  '& p': {
    fontSize: '18px',
    letterSpacing: 'normal'
  },
  '&:hover': {
    color: '#FFFFFF',
    backgroundColor: '#808080',
    '& p': {
      color: '#FFFFFF'
    }
  }
})

export const ActionTab = ({ params }: Props) => {
  const [isOpenCustomerDetailModal, setIsOpenSuctomerDetailModal] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Stack direction='row' gap={2} justifyContent='center'>
      <Button size='small' aria-describedby={Boolean(anchorEl) ? 'simple-popover' : undefined} onClick={handleClick}>
        <ExpandMoreIcon />
      </Button>
      <Popover
        id={Boolean(anchorEl) ? 'simple-popover' : undefined}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <ActionButton>
          <EditIcon fontSize='medium' />
          <Typography>Edit</Typography>
        </ActionButton>
        <ActionButton>
          <DeleteIcon fontSize='medium' />
          <Typography>Delete</Typography>
        </ActionButton>
        <ActionButton onClick={() => setIsOpenSuctomerDetailModal(true)}>
          <VisibilityIcon fontSize='medium' />
          <Typography>Detail</Typography>
        </ActionButton>
      </Popover>
      {isOpenCustomerDetailModal && (
        <CustomerDetailModal
          isOpen={isOpenCustomerDetailModal}
          handleCloseModal={() => setIsOpenSuctomerDetailModal(false)}
          customer_detail={params}
        />
      )}
    </Stack>
  )
}
